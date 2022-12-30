import { BigInt } from '@graphprotocol/graph-ts';
import { Parcel } from '../../generated/schema';

export const getOrCreateParcel = (realmId: BigInt): Parcel => {
    const id = realmId.toString();
    let parcel = Parcel.load(id);

    if (!parcel) {
        parcel = new Parcel(id);
    }

    return parcel;
};
