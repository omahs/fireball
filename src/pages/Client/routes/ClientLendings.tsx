import { useContext, useCallback, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import qs from 'query-string';

import { CustomParsedQuery, SortingListItem } from 'shared/models';
import { GotchiIcon } from 'components/Icons/Icons';
import { ContentInner } from 'components/Content/ContentInner';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import { CommonUtils, FilterUtils } from 'utils';

const sortings: SortingListItem[] = [
  {
    name: 'kin',
    key: 'kinship',
    paramKey: 'kin',
    tooltip: 'kinship',
    icon: <FavoriteBorderIcon fontSize='small' />
  }
];

const initialFilters: any = {
  hauntId: { ...filtersData.hauntId, divider: true },
  whitelistId: { ...filtersData.whitelistId, divider: true },
  borrower: { ...filtersData.borrower, divider: true },
  search: { ...filtersData.search }
};
const queryParamsOrder: string[] = ['haunt', 'whitelistId', 'borrower', 'search', 'sort', 'dir'];

export function ClientLendings() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const { lendings, lendingsSorting, setLendingsSorting, loadingLendings } = useContext<any>(ClientContext);
  const [currentFilters, setCurrentFilters] = useState<any>({ ...initialFilters });
  const [modifiedLendings, setModifiedLendings] = useState<any[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

  useEffect(() => {
    setCurrentFilters((currentFiltersCache: any) =>
      FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
    );

    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key: any = sortings.find(sorting => sorting.paramKey === sort)?.key;

      onSortingChange(key, dir);
    }

    return () => {
      onResetFilters();
    };
  }, []);

  useEffect(() => {
    if (lendings.length > 0) {
      const whitelistData: string[] = [];
      const borrowersAddresses: string[] = [];

      for (let i = 0; i < lendings.length; i++) {
        whitelistData.push(lendings[i].whitelistId);
        borrowersAddresses.push(lendings[i].borrower);
      }

      const sortedWhitelist: string[] = CommonUtils.sortByDirection([...new Set(whitelistData)], 'asc');
      const uniqueBorrowers = [...new Set(borrowersAddresses)];

      setCurrentFilters((currentFiltersCache: any) => {
        const currentFiltersCacheCopy = { ...currentFiltersCache };

        currentFiltersCacheCopy.whitelistId = {
          ...currentFiltersCacheCopy.whitelistId,
          items: sortedWhitelist.map((whitelist: string) => ({
            title: whitelist,
            value: whitelist,
            queryParamValue: whitelist,
            isSelected: false
          }))
        };
        currentFiltersCacheCopy.borrower = {
          ...currentFiltersCacheCopy.borrower,
          items: uniqueBorrowers.map((borrower: string) => ({
            title: CommonUtils.cutAddress(borrower),
            value: borrower,
            queryParamValue: borrower,
            isSelected: false
          }))
        };

        let filtersToReturn: any;

        if (Object.keys(queryParams).length > 0) {
          filtersToReturn = FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCacheCopy);
        } else {
          filtersToReturn = currentFiltersCacheCopy;
        }

        return filtersToReturn;
      });
    }
  }, [lendings]);

  useEffect(() => {
    FilterUtils.onFiltersUpdate(
      currentFilters,
      FilterUtils.getActiveFiltersCount,
      setActiveFiltersCount,
      updateFilterQueryParams
    );
  }, [currentFilters]);

  useEffect(() => {
    const paramKey: any = sortings.find(sorting => sorting.key === lendingsSorting.type)?.paramKey;

    updateSortQueryParams(paramKey, lendingsSorting.dir);
  }, [lendingsSorting]);

  useEffect(() => {
    const modifiedLendings = FilterUtils.getFilteredSortedItems({
      items: lendings,
      filters: currentFilters,
      sorting: lendingsSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    setModifiedLendings(modifiedLendings);
  }, [currentFilters, lendings, lendingsSorting]);

  const onSortingChange = useCallback(
    (type: string, dir: string) => {
      setLendingsSorting({ type, dir });
    },
    [setLendingsSorting]
  );

  const sorting: any = {
    sortingList: sortings,
    sortingDefaults: lendingsSorting,
    onSortingChange: onSortingChange
  };

  const updateSortQueryParams = useCallback(
    (prop: string, dir: string) => {
      const params = { ...queryParams, sort: prop, dir };

      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, queryParamsOrder);
    },
    [queryParams, navigate, location.pathname]
  );

  const updateFilterQueryParams = useCallback(
    (filters: any) => {
      const params = FilterUtils.getUpdatedQueryParams(queryParams, filters);

      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, queryParamsOrder);
    },
    [queryParams, navigate, location.pathname]
  );

  const onSetSelectedFilters = (key: string, selectedValue: any) => {
    FilterUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
  };

  const onResetFilters = useCallback(() => {
    FilterUtils.resetFilters(currentFilters, setCurrentFilters);
  }, [currentFilters]);

  const onExportData = useCallback(() => {
    FilterUtils.exportData(modifiedLendings, 'client_lendings');
  }, [modifiedLendings]);

  return (
    <>
      <SortFilterPanel
        sorting={sorting}
        itemsLength={modifiedLendings.length}
        placeholder={<GotchiIcon width={20} height={20} />}
        isShowFilters={true}
        filters={currentFilters}
        setSelectedFilters={onSetSelectedFilters}
        resetFilters={onResetFilters}
        exportData={onExportData}
        filtersCount={activeFiltersCount}
      />

      <ContentInner dataLoading={loadingLendings}>
        <GotchisLazy
          items={modifiedLendings}
          renderItem={id => (
            <Gotchi
              gotchi={modifiedLendings[id]}
              render={[
                {
                  className: 'gotchiHeader',
                  items: ['collateral', 'kinship', 'level']
                },
                {
                  className: 'imageContainer',
                  items: [
                    'svg',
                    {
                      className: 'rsContainer',
                      items: ['rs']
                    },
                    {
                      className: 'imageFooter',
                      items: ['whitelistId']
                    }
                  ]
                },
                'name',
                {
                  className: 'gotchiFlipContainer',
                  items: [
                    {
                      className: 'gotchiFlipBack',
                      items: ['traits', 'wearablesLine', 'listing']
                    },
                    {
                      className: 'gotchiFlipFront',
                      items: ['lendingStats', 'channeling']
                    }
                  ]
                },
                'flipButton'
              ]}
            />
          )}
        />
      </ContentInner>
    </>
  );
}
