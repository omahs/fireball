import { FakeGotchi } from 'shared/models';
import { AppThunk } from 'core/store/store';
import { FakeGotchisGalleryApi } from 'pages/FakeGotchisGallery/api';

import { getQueuedFakeGotchisQuery } from '../../queries';

import { loadQueuedGotchis, loadQueuedGotchisFailed, loadQueuedGotchisSucceded } from '../slices';

export const loadQueuedFakeGotchis = (): AppThunk => async (dispatch) => {
    dispatch(loadQueuedGotchis());

    FakeGotchisGalleryApi.getGalleryFakeGotchis(getQueuedFakeGotchisQuery())
        .then((res: FakeGotchi[]) => dispatch(loadQueuedGotchisSucceded(res)))
        .catch(() => dispatch(loadQueuedGotchisFailed()));
};
