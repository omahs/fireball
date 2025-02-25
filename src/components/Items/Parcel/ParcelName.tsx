import classNames from 'classnames';

import { CopyToClipboardBlock } from 'components/CopyToClipboard/CopyToClipboardBlock';
import { CitadelUtils } from 'utils';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

export function ParcelName({ parcel }: { parcel: any }) {
  const classes = {
    ...itemStyles(),
    ...ERC1155InnerStyles(),
    ...tooltipStyles(),
    ...parselStyles()
  };

  const size: any = CitadelUtils.getParcelSizeName(parcel.size);

  return (
    <CopyToClipboardBlock text={parcel.parcelHash}>
      <div className={classNames(classes.parcelName, size)}>{parcel.parcelHash}</div>
    </CopyToClipboardBlock>
  );
}
