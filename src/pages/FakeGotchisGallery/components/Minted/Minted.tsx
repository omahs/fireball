import { useEffect } from 'react';

import { FakeGotchi } from 'shared/models';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { ContentInner } from 'components/Content/ContentInner';

import { GalleryLayout } from '../GalleryLayout/GalleryLayout';
import * as fromFakeGotchisGalleryStore from '../../store';

export function Minted() {
  const dispatch = useAppDispatch();

  const mintedGotchis: FakeGotchi[] = useAppSelector(fromFakeGotchisGalleryStore.getMintedGotchis);
  const isMintedGotchisLoading: boolean = useAppSelector(fromFakeGotchisGalleryStore.getIsMintedGotchisLoading);

  useEffect(() => {
    dispatch(fromFakeGotchisGalleryStore.loadMintedFakeGotchis());
  }, []);

  return (
    <>
      <ContentInner dataLoading={isMintedGotchisLoading}>
        <GalleryLayout items={mintedGotchis} />
      </ContentInner>
    </>
  );
}
