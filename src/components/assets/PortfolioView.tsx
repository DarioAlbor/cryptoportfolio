import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectPortfolio, selectTotalValue } from '../../store/portfolios/selectors';
import { ApiWarning } from './ApiWarning';

export const PortfolioView = () => {
    const { t } = useTranslation();
    const portfolio = useSelector(selectPortfolio);
    const total = useSelector(selectTotalValue);

    const isApiKeyError = portfolio.error && (
        portfolio.error.includes('API key') || 
        portfolio.error.includes('Invalid API key')
    );

    return (
        <div style={{ marginTop: '2rem' }}>
            {isApiKeyError ? (
                <ApiWarning />
            ) : portfolio.error ? (
                <div className="alert alert-error">
                    <span className="alert-icon">⚠️</span>
                    <div className="alert-content">
                        <div className="alert-title">{t('error.title')}</div>
                        <div>{portfolio.error}</div>
                    </div>
                </div>
            ) : null}
            
            <div className="portfolio-table-wrapper">
                <table className="portfolio-table">
                    <thead>
                        <tr>
                            <th>{t('table.assetId')}</th>
                            <th>{t('table.symbol')}</th>
                            <th>{t('table.quantity')}</th>
                            <th style={{ textAlign: 'right' }}>{t('table.price')}</th>
                            <th style={{ textAlign: 'right' }}>{t('table.value')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.assets.length === 0 && !portfolio.loading && (
                            <tr>
                                <td colSpan={5}>
                                    <div className="empty-state">
                                        <div className="empty-state-icon">📊</div>
                                        <div className="empty-state-text">
                                            {t('table.empty')}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {portfolio.assets.map(asset => (
                            <tr key={asset.id}>
                                <td>
                                    <span className="badge">{asset.id}</span>
                                </td>
                                <td style={{ fontWeight: 600 }}>{asset.name}</td>
                                <td>{asset.quantity.toFixed(4)}</td>
                                <td style={{ textAlign: 'right' }}>
                                    ${asset.price.toLocaleString('en-US', { 
                                        minimumFractionDigits: 2, 
                                        maximumFractionDigits: 2 
                                    })}
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 600 }}>
                                    ${(asset.price * asset.quantity).toLocaleString('en-US', { 
                                        minimumFractionDigits: 2, 
                                        maximumFractionDigits: 2 
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>
                                {portfolio.loading && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div className="spinner" />
                                        <span>{t('table.loading')}</span>
                                    </div>
                                )}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <strong>{t('table.total')}:</strong>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <span className="total-badge">
                                    💵 ${total.toLocaleString('en-US', { 
                                        minimumFractionDigits: 2, 
                                        maximumFractionDigits: 2 
                                    })}
                                </span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};