import { PortfolioState, OwnedAsset } from './types';
import * as actions from './actions';
import createReducer from '../reducerUtils';

const initialState: PortfolioState = {
    assets: [],
    loading: false
};

const portfolioReducer = createReducer<PortfolioState>(initialState, {
    [actions.addAsset.type]: (state) => ({
        ...state,
        loading: true,
        error: undefined
    }),
    [actions.addAssetSuccess.type]: (state, payload) => {
        const { asset, quantity } = payload;
        const existingAsset = state.assets.find(a => a.id === asset.id);
        
        const updatedAssets = existingAsset
            ? state.assets.map(a => 
                a.id === asset.id 
                    ? { ...a, quantity: a.quantity + quantity, price: asset.price }
                    : a
              )
            : [...state.assets, { ...asset, quantity }];

        return {
            ...state,
            assets: updatedAssets,
            loading: false
        };
    },
    [actions.addAssetFailure.type]: (state, payload) => ({
        ...state,
        loading: false,
        error: payload.error
    })
});

export default portfolioReducer;