import {
    AlchemicaClaimed as AlchemicaClaimedEvent,
    ChannelAlchemica as ChannelAlchemicaEvent,
    gotchiverse as RealmDiamond,
    MintParcel as MinParcelEvent,
    Transfer as TransferEvent
} from '../../generated/gotchiverse/gotchiverse';
import { loadOrCreateParcel, loadOrCreatePlayer } from '../helpers';

export function handleChannelAlchemica(event: ChannelAlchemicaEvent): void {
    const parcel = loadOrCreateParcel(event.params._realmId);
    parcel.lastChanneled = event.block.timestamp;
    parcel.save();
}

export function handleAlchemicaClaimed(event: AlchemicaClaimedEvent): void {
    const parcel = loadOrCreateParcel(event.params._realmId);
    parcel.lastClaimed = event.block.timestamp;
    parcel.save();
}

export function handleMintParcel(event: MinParcelEvent): void {
    const parcel = loadOrCreateParcel(event.params._tokenId);
    const player = loadOrCreatePlayer(event.params._owner);

    parcel.owner = event.params._owner.toHexString();
    const contract = RealmDiamond.bind(event.address);
    const _parcelInfo = contract.try_getParcelInfo(event.params._tokenId);

    if (!_parcelInfo.reverted) {
        const metadata = _parcelInfo.value;
        const boosts = metadata.boost;

        parcel.parcelId = metadata.parcelId;
        parcel.parcelHash = metadata.parcelAddress;
        parcel.size = metadata.size;
        parcel.district = metadata.district;
        parcel.coordinateX = metadata.coordinateX;
        parcel.coordinateY = metadata.coordinateY;

        parcel.fudBoost = boosts[0];
        parcel.fomoBoost = boosts[1];
        parcel.alphaBoost = boosts[2];
        parcel.kekBoost = boosts[3];
    }

    player.parcelsCount = player.parcelsCount + 1;

    parcel.save();
    player.save();
}

export function handleTransfer(event: TransferEvent): void {
    const parcel = loadOrCreateParcel(event.params._tokenId);
    const prevOwner = loadOrCreatePlayer(event.params._from);
    const nextOwner = loadOrCreatePlayer(event.params._to);

    prevOwner.parcelsCount = prevOwner.parcelsCount - 1;
    nextOwner.parcelsCount = nextOwner.parcelsCount + 1;
    parcel.owner = event.params._to.toHexString();

    prevOwner.save();
    nextOwner.save();
    parcel.save();
}
