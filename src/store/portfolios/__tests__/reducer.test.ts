import portfolioReducer from '../reducer';
import * as actions from '../actions';
import { PortfolioState, Asset, OwnedAsset } from '../types';

describe('Portfolio Reducer', () => {
  const initialState: PortfolioState = {
    assets: [],
    loading: false
  };

  it('should return initial state', () => {
    const state = portfolioReducer(undefined, { type: 'UNKNOWN', payload: undefined });
    expect(state).toEqual(initialState);
  });

  describe('addAsset', () => {
    it('should set loading to true and clear error', () => {
      const previousState: PortfolioState = {
        assets: [],
        loading: false,
        error: 'Previous error'
      };

      const action = actions.addAsset('bitcoin', 1);
      const state = portfolioReducer(previousState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeUndefined();
    });
  });

  describe('addAssetSuccess', () => {
    it('should add new asset to empty portfolio', () => {
      const asset: Asset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 45000
      };
      const quantity = 2;

      const action = actions.addAssetSuccess(asset, quantity);
      const state = portfolioReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.assets).toHaveLength(1);
      expect(state.assets[0]).toEqual({ ...asset, quantity });
    });

    it('should increment quantity for existing asset', () => {
      const existingAsset: OwnedAsset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 45000,
        quantity: 1
      };

      const previousState: PortfolioState = {
        assets: [existingAsset],
        loading: true
      };

      const updatedAsset: Asset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 46000
      };

      const action = actions.addAssetSuccess(updatedAsset, 2);
      const state = portfolioReducer(previousState, action);

      expect(state.loading).toBe(false);
      expect(state.assets).toHaveLength(1);
      expect(state.assets[0].quantity).toBe(3);
      expect(state.assets[0].price).toBe(46000);
    });

    it('should add new asset when different from existing ones', () => {
      const existingAsset: OwnedAsset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 45000,
        quantity: 1
      };

      const previousState: PortfolioState = {
        assets: [existingAsset],
        loading: true
      };

      const newAsset: Asset = {
        id: 'ethereum',
        name: 'ETH',
        price: 3000
      };

      const action = actions.addAssetSuccess(newAsset, 5);
      const state = portfolioReducer(previousState, action);

      expect(state.loading).toBe(false);
      expect(state.assets).toHaveLength(2);
      expect(state.assets[1]).toEqual({ ...newAsset, quantity: 5 });
    });
  });

  describe('addAssetFailure', () => {
    it('should set error and stop loading', () => {
      const previousState: PortfolioState = {
        assets: [],
        loading: true
      };

      const error = 'Failed to fetch asset';
      const action = actions.addAssetFailure(error);
      const state = portfolioReducer(previousState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });
});

