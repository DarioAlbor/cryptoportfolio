import React from 'react';
import { useTranslation } from 'react-i18next';

export const ApiWarning = () => {
    const { t } = useTranslation();
    
    return (
        <div className="api-warning">
            <div className="api-warning-icon">🔑</div>
            <div className="api-warning-content">
                <h3 className="api-warning-title">{t('error.apiKeyRequired')}</h3>
                <p className="api-warning-text">
                    {t('error.apiKeyMessage')}
                </p>
                <div className="api-warning-steps">
                    <p><strong>{t('error.quickSetup')}</strong></p>
                    <ol>
                        <li>{t('error.step1')} <a href="https://pro.coincap.io/signup" target="_blank" rel="noopener noreferrer">pro.coincap.io/signup</a></li>
                        <li>{t('error.step2')} <code>.env</code> {t('error.step3')}</li>
                        <li>{t('error.step4')}</li>
                        <li>{t('error.step5')} (<code>npm start</code>)</li>
                    </ol>
                </div>
                <div className="api-warning-code">
                    <code>REACT_APP_COINCAP_API_KEY=your-api-key-here</code>
                </div>
                <p className="api-warning-text" style={{ marginTop: '1rem', fontSize: '0.8125rem', opacity: 0.9 }}>
                    💡 {t('error.tip')} <code>.env.example</code> {t('error.tipContinue')} <code>.env</code> {t('error.tipEnd')}
                </p>
            </div>
        </div>
    );
};

