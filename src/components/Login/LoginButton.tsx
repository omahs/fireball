import { useEffect } from 'react';
import { Backdrop, Typography } from '@mui/material';

import { ethers } from 'ethers';
import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
  addAddress,
  getActiveAddress,
  getIsDropdownOpen,
  getLoggedAddress,
  selectActiveAddress,
  toggleLoginDropdown
} from 'core/store/login';
import { DONATE_ADDRESS } from 'shared/constants';
import { LoginAddress as LoginAddressModel } from 'shared/models';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { MetamaskIcon } from 'components/Icons/Icons';
import { useLocalStorage } from 'hooks/useLocalStorage';

import { LoginNavigation } from './LoginNavigation';
import { LoginAddress } from './LoginAddress';

import { styles } from './styles';

const donateAddress: LoginAddressModel = {
  name: 'fireball donations addr',
  address: DONATE_ADDRESS
};

export function LoginButton() {
  const classes = styles();

  const { connect, getAccounts, metaState } = useMetamask();

  const [isDonateAddressShown, setIsDonateAddressShown] = useLocalStorage(
    'DONATE_ADDRESS_SHOWN',
    JSON.parse(localStorage.getItem('DONATE_ADDRESS_SHOWN') as string)
  );
  const dispatch = useAppDispatch();
  const activeAddress = useAppSelector(getActiveAddress);
  const storeLoggedAddress = useAppSelector(getLoggedAddress);
  const isDropdownOpen = useAppSelector(getIsDropdownOpen);

  useEffect(() => {
    // connect metamask on load
    if (metaState.isAvailable) {
      (async () => {
        try {
          if (getAccounts) {
            const accounts: string[] = await getAccounts();

            if (accounts.length) {
              connectMetamask();
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  useEffect(() => {
    // handle metamask accounts
    if (metaState.account[0]) {
      if (metaState.account[0] === activeAddress || !activeAddress?.length) {
        dispatch(selectActiveAddress(metaState.account[0]));
      }
    } else if (metaState.account[0] === activeAddress) {
      // on metamask logout
      dispatch(selectActiveAddress(storeLoggedAddress.length ? storeLoggedAddress[0].address : ''));
    }
  }, [metaState]);

  useEffect(() => {
    if (isDonateAddressShown === null) {
      dispatch(addAddress(donateAddress));
      setIsDonateAddressShown(true);
    }
  }, [isDonateAddressShown]);

  const connectMetamask = async (): Promise<any> => {
    if (metaState.isAvailable && !metaState.isConnected) {
      try {
        if (connect) {
          await connect(ethers.providers.Web3Provider, 'any');

          return true;
        }
      } catch (error) {
        return false;
      }
    }
  };

  const onCloseDropdown = (): void => {
    dispatch(toggleLoginDropdown(false));
  };

  const onToggleDropdown = (): void => {
    dispatch(toggleLoginDropdown(!isDropdownOpen));
  };

  const onAddressSubmit = (address: string): void => {
    const duplicated: Undefinable<LoginAddressModel> = storeLoggedAddress.find((item: any) => item.address === address);

    onCloseDropdown();

    dispatch(selectActiveAddress(address));

    if (!duplicated) {
      dispatch(
        addAddress({
          address,
          name: address.slice(0, 6)
        })
      );
    }
  };

  const onAccountLogout = (loginAddress: LoginAddressModel) => {
    if (loginAddress.address === DONATE_ADDRESS) {
      setIsDonateAddressShown(false);
    }
  };

  return (
    <>
      <div className={classNames(classes.button, isDropdownOpen && 'opened')}>
        <div className={classes.buttonInner} onClick={onToggleDropdown}>
          {activeAddress ? (
            metaState.account[0] === activeAddress && (
              <div className={classes.buttonIcon}>
                <MetamaskIcon width={14} height={14} />
              </div>
            )
          ) : (
            <div className={classes.caption}>
              <Typography className={classes.captionText}>Connect account</Typography>
            </div>
          )}

          {activeAddress ? (
            <div className={classes.address}>
              <EthAddress address={activeAddress} isShowIcon={true} />
            </div>
          ) : null}
        </div>

        {isDropdownOpen ? (
          <div className={classNames(classes.buttonDropdown, metaState.account[0] && 'offset-top')}>
            <div className={classNames(classes.loginList, 'custom-scroll')}>
              {metaState.account[0] ? (
                <div className={classes.loginAddressBox}>
                  <LoginAddress address={{ name: 'Metamask', address: metaState.account[0] }} isMetamask={true} />
                </div>
              ) : null}

              {storeLoggedAddress.length
                ? storeLoggedAddress.map((item: any, index: number) => {
                    return <LoginAddress address={item} key={index} onLogout={onAccountLogout} />;
                  })
                : null}
            </div>
            <LoginNavigation onSubmit={onAddressSubmit} />
          </div>
        ) : null}
      </div>

      <Backdrop open={isDropdownOpen} onClick={onCloseDropdown} className={classes.loginBackdrop}></Backdrop>
    </>
  );
}
