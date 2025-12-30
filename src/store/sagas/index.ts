import { all } from 'redux-saga/effects';
import { portfolioSaga } from '../portfolios/saga';

export default function* rootSaga() {
  yield all([
    portfolioSaga()
  ]);
}
