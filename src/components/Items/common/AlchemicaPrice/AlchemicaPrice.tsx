import { useContext, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

import classNames from 'classnames';

import { TokenTypes } from 'shared/constants';
import { AlchemicaList } from 'shared/models';
import {
  FudTokenIcon,
  FomoTokenIcon,
  AlphaTokenIcon,
  KekTokenIcon,
  GhstTokenIcon,
  DaiTokenIcon,
  GltrTokenIcon
} from 'components/Icons/Icons';
import { TokensPricesContext } from 'contexts/TokensPricesContext';
import { CommonUtils } from 'utils';

import { styles } from './styles';

const icons = [FudTokenIcon, FomoTokenIcon, AlphaTokenIcon, KekTokenIcon, GltrTokenIcon];

interface AlchemicaPriceProps {
  alchemica: AlchemicaList;
  gltr?: number;
  className?: string;
}

export function AlchemicaPrice({ alchemica, gltr, className }: AlchemicaPriceProps) {
  const classes = styles();

  const [itemPrice, setItemPrice] = useState<number>(0);
  const { tokensPrices, isPricesLoaded } = useContext<any>(TokensPricesContext);

  const tokensList = gltr ? [...alchemica, gltr] : alchemica;

  const getItemPrice = (tokens: number[]): number => {
    const tokensName = Object.values(TokenTypes);

    return tokens.reduce((prev: number, current: number, index: number) => {
      return prev + current * tokensPrices[tokensName[index]];
    }, 0);
  };

  useEffect(() => {
    if (isPricesLoaded) {
      const price = getItemPrice(tokensList);

      setItemPrice(price !== 0 ? Number(price.toFixed(2)) : 0);
    }
  }, [isPricesLoaded, alchemica]);

  return (
    <div className={classNames(classes.alchemicaWrapper, className)}>
      <div className={classes.alchemica}>
        {tokensList.map((amount: number, index: number) => {
          const Icon = icons[index];

          return (
            <div className={classes.token} key={index}>
              <Icon className={classes.tokenIcon} width={20} height={20} />
              <span className={classes.amount}>{CommonUtils.convertFloatNumberToSuffixNumber(amount)}</span>
            </div>
          );
        })}
      </div>
      {isPricesLoaded ? (
        <div className={classes.totalPrice}>
          {CommonUtils.convertFloatNumberToSuffixNumber(itemPrice / tokensPrices[TokenTypes.Ghst])}
          <GhstTokenIcon width={14} height={14} />
          <span>/</span>
          {itemPrice}
          <DaiTokenIcon width={14} height={14} />
        </div>
      ) : (
        <ContentLoader
          speed={2}
          viewBox='0 0 120 22'
          backgroundColor='#2c2f36'
          foregroundColor='#16181a'
          className={classes.placeholder}
        >
          <rect x='0' y='0' width='120' height='22' />
        </ContentLoader>
      )}
    </div>
  );
}
