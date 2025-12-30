import * as actions from '../actions';
import { Asset } from '../types';

describe('Portfolio Actions', () => {
  describe('addAsset', () => {
    it('should create action with correct type and payload', () => {
      const id = 'bitcoin';
      const quantity = 2.5;
      
      const action = actions.addAsset(id, quantity);
      
      expect(action.type).toBe('portfolio/addAsset');
      expect(action.payload).toEqual({ id, quantity });
    });
  });

  describe('addAssetSuccess', () => {
    it('should create success action with asset and quantity', () => {
      const asset: Asset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 45000
      };
      const quantity = 2.5;
      
      const action = actions.addAssetSuccess(asset, quantity);
      
      expect(action.type).toBe('portfolio/addAssetSuccess');
      expect(action.payload).toEqual({ asset, quantity });
    });
  });

  describe('addAssetFailure', () => {
    it('should create failure action with error message', () => {
      const error = 'Network error';
      
      const action = actions.addAssetFailure(error);
      
      expect(action.type).toBe('portfolio/addAssetFailure');
      expect(action.payload).toEqual({ error });
    });
  });
});

