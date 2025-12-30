import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addAsset } from '../../store/portfolios/actions';

const POPULAR_ASSETS = [
    { id: '', name: 'selectPlaceholder', disabled: true },
    { id: 'bitcoin', name: '₿ Bitcoin (BTC)' },
    { id: 'ethereum', name: 'Ξ Ethereum (ETH)' },
    { id: 'binance-coin', name: 'Binance Coin (BNB)' },
    { id: 'solana', name: 'Solana (SOL)' },
    { id: 'cardano', name: 'Cardano (ADA)' },
    { id: 'xrp', name: 'XRP (XRP)' },
    { id: 'dogecoin', name: '🐕 Dogecoin (DOGE)' },
    { id: 'polkadot', name: 'Polkadot (DOT)' },
    { id: 'avalanche', name: 'Avalanche (AVAX)' },
    { id: 'chainlink', name: 'Chainlink (LINK)' },
    { id: 'tron', name: 'Tron (TRX)' },
    { id: 'tether', name: 'Tether (USDT)' },
    { id: 'usd-coin', name: 'USD Coin (USDC)' },
    { id: 'wrapped-bitcoin', name: 'Wrapped Bitcoin (WBTC)' },
    { id: 'bitcoin-cash', name: 'Bitcoin Cash (BCH)' }
];

export const AddAssetForm = () => {
    const { t } = useTranslation();
    const [id, setId] = useState('');
    const [quantity, setQuantity] = useState('');
    const dispatch = useDispatch();

    const submit = () => {
        const qty = Number(quantity);
        if (id && qty > 0) {
            dispatch(addAsset(id, qty));
            setId('');
            setQuantity('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    return (
        <div className="add-asset-form">
            <div className="form-group">
                <label className="form-label">{t('form.cryptocurrency')}</label>
                <select 
                    className="form-input form-select" 
                    value={id}
                    onChange={e => setId(e.target.value)}
                >
                    {POPULAR_ASSETS.map(asset => (
                        <option 
                            key={asset.id || 'default'} 
                            value={asset.id}
                            disabled={asset.disabled}
                        >
                            {asset.disabled ? t('form.selectPlaceholder') : asset.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label className="form-label">{t('form.quantity')}</label>
                <input 
                    type="number" 
                    placeholder="0.00" 
                    className="form-input" 
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    min="0"
                    step="0.01"
                />
            </div>
            <button 
                className="btn btn-primary" 
                onClick={submit}
                disabled={!id || !quantity}
            >
                ➕ {t('form.addAsset')}
            </button>
        </div>
    );
};