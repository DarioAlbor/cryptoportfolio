import { RootState } from '../../store';
import { calculateTotal } from './types';

export const selectPortfolio = (state: RootState) => state.portfolio;

export const selectTotalValue = (state: RootState) => 
    state.portfolio.assets.reduce((acc, asset) => acc + calculateTotal(asset), 0);
