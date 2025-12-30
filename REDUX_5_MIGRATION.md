# Redux 5 Migration Guide

## Current State

**Current Version:** Redux 4.1.2  
**Target Version:** Redux 5.0.1  
**React-Redux:** 7.2.9 → 9.0.4

## Executive Summary

Redux 5 maintains backward compatibility for core concepts but introduces breaking changes in store configuration and middleware setup. The migration path is straightforward, and adopting Redux Toolkit (RTK) alongside Redux 5 significantly improves developer experience.

---

## Breaking Changes Analysis

### 1. Store Configuration

#### `createStore` Removal

**Current Implementation (Redux 4):**
```typescript
// src/store/index.ts
import { applyMiddleware, combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import portfolioReducer from './portfolios/reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({ 
        portfolio: portfolioReducer
    }),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
```

**Breaking Change:**
- `createStore` completely removed (no more `legacy_createStore`)
- `applyMiddleware` still exists but RTK's `configureStore` is recommended

**Redux 5 Migration (Minimal Changes):**
```typescript
// Option 1: Using Redux 5 without RTK
import { createStore as legacyCreateStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from '@redux-devtools/extension';

const sagaMiddleware = createSagaMiddleware();

export const store = legacyCreateStore(
    combineReducers({ 
        portfolio: portfolioReducer
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
```

**Redux 5 with RTK (Recommended):**
```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import portfolioReducer from './portfolios/reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        portfolio: portfolioReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: ['persist/PERSIST']
            }
        }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Benefits of RTK's configureStore:**
- Redux DevTools automatically enabled
- `combineReducers` handled internally
- Middleware setup simplified
- Better TypeScript inference
- Serializable state check included

---

### 2. Action Creators

#### Current Implementation

**Custom Action Creator Utility:**
```typescript
// src/store/actionsUtils.ts
export type Action<P> = {
  type: string;
  payload: P;
};

export type ActionCreator<U, P> =
  (U extends any[]
    ? (...args: U) => Action<P>
    : () => Action<P>)
  & { type: string };

export function createAction<U extends any[], P>(
  type: string,
  creator?: (...args: U) => P
): ActionCreator<U, P> {
  const val = (...actionArgs: U) => ({
        type,
        payload: creator?.(...actionArgs),
      });
  return Object.assign(val as ActionCreator<U, P>, { type });
}
```

**Current Actions:**
```typescript
// src/store/portfolios/actions.ts
import { createAction } from "../../store/actionsUtils";
import { Asset } from "./types";

export const addAsset = createAction('portfolio/addAsset',
    (id: string, quantity: number) => ({ id, quantity })
);

export const addAssetSuccess = createAction('portfolio/addAssetSuccess',
    (asset: Asset, quantity: number) => ({ asset, quantity })
);

export const addAssetFailure = createAction('portfolio/addAssetFailure',
    (error: string) => ({ error })
);
```

**No Breaking Changes Required**  
✅ Custom action creators continue to work in Redux 5

**RTK Alternative (Recommended):**
```typescript
// Using RTK's createAction
import { createAction } from '@reduxjs/toolkit';
import { Asset } from "./types";

export const addAsset = createAction(
    'portfolio/addAsset',
    (id: string, quantity: number) => ({ payload: { id, quantity } })
);

export const addAssetSuccess = createAction(
    'portfolio/addAssetSuccess',
    (asset: Asset, quantity: number) => ({ payload: { asset, quantity } })
);

export const addAssetFailure = createAction(
    'portfolio/addAssetFailure',
    (error: string) => ({ payload: { error } })
);

// TypeScript inference
type AddAssetAction = ReturnType<typeof addAsset>;
```

---

### 3. Reducers

#### Current Implementation

**Custom Reducer Utility:**
```typescript
// src/store/reducerUtils.ts
import { Action } from "./actionsUtils";

const createReducer = <S>(
    initial: S,
    actions: Record<string, (state: S, payload?: any) => S>
) => {
    const handlers: Record<string, (state: S, payload?: any) => S> = {};
    Object.entries(actions).forEach(([key, handler]) => {
        handlers[key] = handler;
    });
    return (state = initial, action: Action<unknown>): S => {
        const handler = handlers[action.type];
        if (handler !== undefined) {
            return handler(state, action.payload);
        }
        return state;
    };
};

export default createReducer;
```

**Current Reducer:**
```typescript
// src/store/portfolios/reducer.ts
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
```

**No Breaking Changes Required**  
✅ Custom reducers continue to work in Redux 5

**RTK Alternative with Immer (Recommended):**
```typescript
// Using RTK's createReducer with Immer
import { createReducer } from '@reduxjs/toolkit';
import { PortfolioState } from './types';
import * as actions from './actions';

const initialState: PortfolioState = {
    assets: [],
    loading: false
};

const portfolioReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.addAsset, (state) => {
            state.loading = true;
            state.error = undefined;
        })
        .addCase(actions.addAssetSuccess, (state, action) => {
            const { asset, quantity } = action.payload;
            const existingAsset = state.assets.find(a => a.id === asset.id);
            
            if (existingAsset) {
                existingAsset.quantity += quantity;
                existingAsset.price = asset.price;
            } else {
                state.assets.push({ ...asset, quantity });
            }
            
            state.loading = false;
        })
        .addCase(actions.addAssetFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });
});

export default portfolioReducer;
```

**Benefits of RTK's createReducer:**
- Immer integration (mutating syntax works)
- Better TypeScript inference
- Builder callback pattern
- No spread operators needed

---

### 4. TypeScript Types

**Current Types:**
```typescript
// src/store/index.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**No Changes Required in Redux 5**  
✅ Type definitions remain the same

**Enhanced TypeScript (RTK):**
```typescript
// Create typed hooks
// src/hooks/redux.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

### 5. Selectors

**Current Implementation:**
```typescript
// src/store/portfolios/selectors.ts
import { RootState } from '../../store';
import { calculateTotal } from './types';

export const selectPortfolio = (state: RootState) => state.portfolio;

export const selectTotalValue = (state: RootState) => 
    state.portfolio.assets.reduce((acc, asset) => acc + calculateTotal(asset), 0);
```

**No Changes Required**  
✅ Selectors work identically in Redux 5

**RTK Alternative with Reselect:**
```typescript
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { calculateTotal } from './types';

export const selectPortfolio = (state: RootState) => state.portfolio;

export const selectAssets = createSelector(
    selectPortfolio,
    (portfolio) => portfolio.assets
);

export const selectTotalValue = createSelector(
    selectAssets,
    (assets) => assets.reduce((acc, asset) => acc + calculateTotal(asset), 0)
);
```

**Benefits:**
- Memoization (performance optimization)
- Composed selectors
- Better testability

---

### 6. Saga Integration

**Current Implementation:**
```typescript
// src/store/portfolios/saga.ts
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
```

**No Breaking Changes**  
✅ Redux-Saga 1.2.3+ is compatible with Redux 5

**Type Safety Improvement (RTK):**
```typescript
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAssetPrice } from '../../services/api';
import * as actions from './actions';
import { Asset } from './types';

function* fetchAssetSaga(action: ReturnType<typeof actions.addAsset>) {
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
```

---

## Dependency Updates

### Required Package Updates

```json
{
  "dependencies": {
    "redux": "^5.0.1",
    "@reduxjs/toolkit": "^2.0.1",
    "react-redux": "^9.0.4",
    "redux-saga": "^1.3.0"
  }
}
```

### Installation Commands

**Minimal Migration (Redux 5 only):**
```bash
npm install redux@5 react-redux@9
```

**Recommended Migration (with RTK):**
```bash
npm install redux@5 @reduxjs/toolkit@2 react-redux@9 redux-saga@1.3.0
```

**Development Dependencies:**
```bash
npm install --save-dev @redux-devtools/extension
```

---

## Migration Steps

### Phase 1: Preparation (No Breaking Changes)

1. **Update Dependencies:**
```bash
npm install redux@5 react-redux@9
```

2. **Verify Tests:**
```bash
npm test
```

3. **Update DevTools (if used):**
```bash
npm install --save-dev @redux-devtools/extension
```

### Phase 2: Store Migration

**Option A: Minimal Changes**
```typescript
// Keep existing structure, just update imports
import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
```

**Option B: Adopt RTK (Recommended)**
```typescript
// Replace entire store configuration with configureStore
import { configureStore } from '@reduxjs/toolkit';
```

### Phase 3: Gradual RTK Adoption (Optional)

1. **Start with store configuration:**
   - Replace `createStore` with `configureStore`
   
2. **Migrate actions (optional):**
   - Keep existing actions or gradually adopt RTK's `createAction`
   
3. **Migrate reducers (optional):**
   - Keep existing reducers or gradually adopt RTK's `createReducer`
   
4. **Add typed hooks:**
   - Create `useAppDispatch` and `useAppSelector`

---

## Compatibility Matrix

| Feature | Redux 4 | Redux 5 | RTK 2 |
|---------|---------|---------|-------|
| createStore | ✅ | ❌ | N/A |
| configureStore | N/A | ✅ | ✅ |
| Custom actions | ✅ | ✅ | ✅ |
| Custom reducers | ✅ | ✅ | ✅ |
| Redux Saga | ✅ | ✅ | ✅ |
| DevTools | Manual | Manual | Auto |
| TypeScript | Good | Better | Best |
| Bundle size | Base | Base | +8KB |

---

## Testing Strategy

### 1. Test Current Implementation
```bash
npm test
```

### 2. Update Dependencies
```bash
npm install redux@5 react-redux@9
```

### 3. Verify Tests Pass
```bash
npm test
```

### 4. Update Store Configuration
- Implement changes incrementally
- Run tests after each change

### 5. Verify Application Behavior
```bash
npm start
```

---

## Rollback Plan

If issues arise:

1. **Revert package.json:**
```json
{
  "redux": "^4.1.2",
  "react-redux": "^7.2.9"
}
```

2. **Reinstall:**
```bash
npm install
```

3. **Revert code changes via git:**
```bash
git checkout src/store/index.ts
```

---

## Benefits Summary

### Redux 5 Benefits
- ✅ Maintained API compatibility
- ✅ Better TypeScript support
- ✅ Performance improvements
- ✅ Smaller bundle size
- ✅ Active development

### RTK Additional Benefits
- ✅ 50% less boilerplate code
- ✅ Built-in DevTools
- ✅ Immer integration
- ✅ Best practices enforced
- ✅ Excellent TypeScript inference

---

## Conclusion

**Migration Complexity:** Low to Medium  
**Recommended Approach:** Gradual migration with RTK adoption  
**Breaking Changes Impact:** Minimal (primarily store configuration)  
**Development Time:** 2-4 hours for full migration

The current codebase is well-structured and will require minimal changes for Redux 5 compatibility. The custom action creator and reducer utilities will continue to work, making this a low-risk migration.

**Next Steps:**
1. Update dependencies
2. Run tests to verify compatibility
3. Gradually adopt RTK features
4. Update documentation

---

**Last Updated:** December 2025  
**Author:** Dario Albor  
**Project:** Crypto Portfolio

