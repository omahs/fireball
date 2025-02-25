import { useEffect } from 'react';

import { FakeGotchi } from 'shared/models';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { ContentInner } from 'components/Content/ContentInner';

import { GalleryLayout } from '../GalleryLayout/GalleryLayout';

import * as fromFakeGotchisGalleryStore from '../../store';

export function Queue() {
  const dispatch = useAppDispatch();

  const queuedGotchis: FakeGotchi[] = useAppSelector(fromFakeGotchisGalleryStore.getQueuedGotchis);
  const isQueuedGotchisLoading: boolean = useAppSelector(fromFakeGotchisGalleryStore.getIsQueuedGotchisLoading);

  useEffect(() => {
    dispatch(fromFakeGotchisGalleryStore.loadQueuedFakeGotchis());
  }, []);

  return (
    <>
      <ContentInner dataLoading={isQueuedGotchisLoading}>
        <GalleryLayout items={queuedGotchis} />
      </ContentInner>
    </>
  );
}
