import { calculateTotal, OwnedAsset } from '../types';

describe('Portfolio Types Utilities', () => {
  describe('calculateTotal', () => {
    it('should calculate total value correctly', () => {
      const asset: OwnedAsset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 45000,
        quantity: 2
      };

      const total = calculateTotal(asset);
      expect(total).toBe(90000);
    });

    it('should handle decimal quantities', () => {
      const asset: OwnedAsset = {
        id: 'ethereum',
        name: 'ETH',
        price: 3000,
        quantity: 0.5
      };

      const total = calculateTotal(asset);
      expect(total).toBe(1500);
    });

    it('should handle zero quantity', () => {
      const asset: OwnedAsset = {
        id: 'solana',
        name: 'SOL',
        price: 100,
        quantity: 0
      };

      const total = calculateTotal(asset);
      expect(total).toBe(0);
    });

    it('should handle large numbers', () => {
      const asset: OwnedAsset = {
        id: 'bitcoin',
        name: 'BTC',
        price: 50000,
        quantity: 100
      };

      const total = calculateTotal(asset);
      expect(total).toBe(5000000);
    });
  });
});

