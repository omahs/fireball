import { AppThunk } from 'core/store/store';
import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams } from 'shared/models';
import {
    ActivityParcelListingDTO,
    ActivityParcelListingFilters,
    ActivityParcelListingVM,
    ActivityParcelListingFiltersType
} from '../../models';
import { getBaazaarActivityParcelsListingsQuery } from '../../queries';
import { GraphFiltersUtils } from 'utils';

import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import { ActivityParcelListingFilterTypes } from '../../constants';
import {
    loadActivityParcelsListings,
    loadActivityParcelsListingsSucceded,
    loadActivityParcelsListingsFailed,
    setActivityParcelsListingsFilters,
    setActivityParcelsListingsIsFiltersUpdated,
    setIsActivityParcelsListingsInitialDataLoading,
    resetActivityParcelsListings
} from '../slices';

export const loadBaazaarActivityParcelsListings = (shouldResetListings: boolean = false): AppThunk => (dispatch, getState) => {
    dispatch(loadActivityParcelsListings());

    const activityParcelsListingsGraphQueryParams: GraphQueryParams =
        getState().baazaar.activity.parcels.activityParcelsListingsGraphQueryParams;
    const activityParcelsListings: ActivityParcelListingVM[] = getState().baazaar.activity.parcels.activityParcelsListings.data;
    const filters: ActivityParcelListingFilters = getState().baazaar.activity.parcels.activityParcelsListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: ActivityParcelListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarActivityParcelsListingsQuery(activityParcelsListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getParcelListings<ActivityParcelListingDTO>(query)
        .then((res: ActivityParcelListingDTO[]) => {
            const modifiedListings: ActivityParcelListingVM[] = mapActivityParcelsDTOToVM(res);

            if (shouldResetListings) {
                dispatch(loadActivityParcelsListingsSucceded(modifiedListings));
            } else {
                dispatch(loadActivityParcelsListingsSucceded(activityParcelsListings.concat(modifiedListings)));
            }

        })
        .catch(() => {
            dispatch(loadActivityParcelsListingsFailed());
        })
        .finally(() => {
            dispatch(setIsActivityParcelsListingsInitialDataLoading(false));
        });
};

export const onLoadBaazaarActivityParcelsListings = (): AppThunk => (dispatch, getState) => {
    const isFiltersUpdated: boolean = getState().baazaar.activity.parcels.activityParcelsListingsIsFiltersUpdated;

    if (isFiltersUpdated) {
        dispatch(loadBaazaarActivityParcelsListings(true));
    }
};

export const updateActivityParcelsListingsFilterByKey =
    ({ key, value }: { key: ActivityParcelListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        (dispatch, getState) => {
            const filters: ActivityParcelListingFilters = getState().baazaar.activity.parcels.activityParcelsListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setActivityParcelsListingsFilters({ ...filters, [key]: updatedFilter as ActivityParcelListingFiltersType }));
        };

export const resetActivityParcelsListingsFilters = (): AppThunk =>
    (dispatch, getState) => {
        const filters: ActivityParcelListingFilters = getState().baazaar.activity.parcels.activityParcelsListingsFilters;

        const updatedFilters: ActivityParcelListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityParcelListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setActivityParcelsListingsFilters(updatedFilters));
    };

export const resetActivityParcelsData = (): AppThunk =>
    (dispatch, getState) => {
        const filters: ActivityParcelListingFilters = getState().baazaar.activity.parcels.activityParcelsListingsFilters;

        const updatedFilters: ActivityParcelListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityParcelListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setActivityParcelsListingsFilters(updatedFilters));
        dispatch(resetActivityParcelsListings());
        dispatch(setActivityParcelsListingsIsFiltersUpdated(false));
        dispatch(setIsActivityParcelsListingsInitialDataLoading(true));
    };

const mapActivityParcelsDTOToVM = (listings: ActivityParcelListingDTO[]): ActivityParcelListingVM[] => {
    return listings.map((listing: ActivityParcelListingDTO) => ({
        ...listing,
        ...listing.parcel,
        id: listing.id,
        coordinateX: Number(listing.parcel.coordinateX),
        coordinateY: Number(listing.parcel.coordinateY),
        fudBoost: Number(listing.parcel.fudBoost),
        fomoBoost: Number(listing.parcel.fomoBoost),
        alphaBoost: Number(listing.parcel.alphaBoost),
        kekBoost: Number(listing.parcel.kekBoost),
        timesTraded: Number(listing.parcel.timesTraded),
        listings: [{
            id: listing.id,
            priceInWei: listing.priceInWei
        }],
        historicalPrices: listing.parcel.historicalPrices ? listing.parcel.historicalPrices : [],
        timePurchased: Number(listing.timePurchased)
    }));
};
