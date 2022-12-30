import { AlchemicaClaimed as AlchemicaClaimedEvent } from '../../generated/gotchiverse/gotchiverse';
import { getOrCreateParcel } from '../helpers/parcel.helper';

export function handleAlchemicaClaimed(event: AlchemicaClaimedEvent): void {
    // set last claim alchemica
    let parcel = getOrCreateParcel(event.params._realmId);
    parcel.lastClaimedAlchemica = event.block.timestamp;
    parcel.save();
}
