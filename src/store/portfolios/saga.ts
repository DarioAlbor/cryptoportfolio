import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAssetPrice } from '../../services/api';
import * as actions from './actions';
import { ActionCreatorPayload } from '../actionsUtils';
import { Asset } from './types';

function* fetchAssetSaga(action: { type: string; payload: ActionCreatorPayload<typeof actions.addAsset> }) {
    try {
        const { id, quantity } = action.payload;
        const asset: Asset = yield call(fetchAssetPrice, id);
        yield put(actions.addAssetSuccess(asset, quantity));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch asset';
        yield put(actions.addAssetFailure(message));
    }
}

export function* portfolioSaga() {
    yield takeEvery(actions.addAsset.type, fetchAssetSaga);
}