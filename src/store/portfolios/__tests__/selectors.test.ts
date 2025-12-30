import { selectPortfolio, selectTotalValue } from '../selectors';
import { RootState } from '../../index';
import { OwnedAsset } from '../types';

describe('Portfolio Selectors', () => {
  describe('selectPortfolio', () => {
    it('should select portfolio state', () => {
      const portfolioState = {
        assets: [],
        loading: false
      };

      const state = {
        portfolio: portfolioState
      } as unknown as RootState;

      const result = selectPortfolio(state);
      expect(result.assets).toEqual(portfolioState.assets);
      expect(result.loading).toEqual(portfolioState.loading);
    });
  });

  describe('selectTotalValue', () => {
    it('should return 0 for empty portfolio', () => {
      const state = {
        portfolio: {
          assets: [],
          loading: false
        }
      } as unknown as RootState;

      const total = selectTotalValue(state);
      expect(total).toBe(0);
    });

    it('should calculate total value for single asset', () => {
      const asset: OwnedAsset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 45000,
        quantity: 2
      };

      const state = {
        portfolio: {
          assets: [asset],
          loading: false
        }
      } as unknown as RootState;

      const total = selectTotalValue(state);
      expect(total).toBe(90000);
    });

    it('should calculate total value for multiple assets', () => {
      const assets: OwnedAsset[] = [
        {
          id: 'bitcoin',
          name: 'BTC',
          price: 45000,
          quantity: 2
        },
        {
          id: 'ethereum',
          name: 'ETH',
          price: 3000,
          quantity: 5
        },
        {
          id: 'solana',
          name: 'SOL',
          price: 100,
          quantity: 10
        }
      ];

      const state = {
        portfolio: {
          assets,
          loading: false
        }
      } as unknown as RootState;

      const total = selectTotalValue(state);
      expect(total).toBe(106000);
    });

    it('should handle decimal quantities correctly', () => {
      const asset: OwnedAsset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 45000,
        quantity: 0.5
      };

      const state = {
        portfolio: {
          assets: [asset],
          loading: false
        }
      } as unknown as RootState;

      const total = selectTotalValue(state);
      expect(total).toBe(22500);
    });
  });
});

