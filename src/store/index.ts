import { applyMiddleware, combineReducers  } from 'redux'
import { legacy_createStore as createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import portfolioReducer from './portfolios/reducer';
import rootSaga from './sagas';

const persistConfig = {
  key: 'portfolio',
  storage,
  whitelist: ['assets']
};

const persistedPortfolioReducer = persistReducer(persistConfig, portfolioReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers( 
        { 
            portfolio: persistedPortfolioReducer
        }),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
