import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { portfolioSaga } from '../saga';
import * as actions from '../actions';
import { fetchAssetPrice } from '../../../services/api';
import { Asset } from '../types';

describe('Portfolio Saga', () => {
  describe('fetchAssetSaga', () => {
    it('should fetch asset and dispatch success action', () => {
      const id = 'bitcoin';
      const quantity = 2;
      const asset: Asset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 45000
      };

      return expectSaga(portfolioSaga)
        .provide([
          [matchers.call.fn(fetchAssetPrice), asset]
        ])
        .put(actions.addAssetSuccess(asset, quantity))
        .dispatch(actions.addAsset(id, quantity))
        .silentRun();
    });

    it('should handle API error and dispatch failure action', () => {
      const id = 'invalid-coin';
      const quantity = 1;
      const error = new Error('API error');

      return expectSaga(portfolioSaga)
        .provide([
          [matchers.call.fn(fetchAssetPrice), throwError(error)]
        ])
        .put(actions.addAssetFailure('API error'))
        .dispatch(actions.addAsset(id, quantity))
        .silentRun();
    });

    it('should handle Error exceptions with message', () => {
      const id = 'bitcoin';
      const quantity = 1;

      return expectSaga(portfolioSaga)
        .provide([
          [matchers.call.fn(fetchAssetPrice), throwError(new Error('Network error'))]
        ])
        .put(actions.addAssetFailure('Network error'))
        .dispatch(actions.addAsset(id, quantity))
        .silentRun();
    });

    it('should handle multiple asset additions', () => {
      const bitcoin: Asset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 45000
      };

      return expectSaga(portfolioSaga)
        .provide([
          [matchers.call.fn(fetchAssetPrice), bitcoin]
        ])
        .put(actions.addAssetSuccess(bitcoin, 2))
        .put(actions.addAssetSuccess(bitcoin, 5))
        .dispatch(actions.addAsset('bitcoin', 2))
        .dispatch(actions.addAsset('bitcoin', 5))
        .silentRun();
    });

    it('should call API with correct asset id', () => {
      const id = 'solana';
      const quantity = 10;
      const asset: Asset = {
        id: 'solana',
        name: 'SOL',
        price: 100
      };

      return expectSaga(portfolioSaga)
        .provide([
          [matchers.call.fn(fetchAssetPrice), asset]
        ])
        .call(fetchAssetPrice, id)
        .dispatch(actions.addAsset(id, quantity))
        .silentRun();
    });
  });
});

