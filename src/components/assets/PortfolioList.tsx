import React from "react";
import { useTranslation } from 'react-i18next';
import { AddAssetForm } from "./AddAssetForm";
import { PortfolioView } from "./PortfolioView";
import "./Portfolio.css";

const PortfolioList = () => {
    const { t } = useTranslation();
    
    return (
    <div className="portfolio-container">
        <div className="portfolio-card">
            <div className="portfolio-header">
                <h2 className="portfolio-title">{t('portfolio.title')}</h2>
                <p className="portfolio-description">{t('portfolio.description')}</p>
            </div>
            <div className="portfolio-body">
                <AddAssetForm />
                <PortfolioView />
            </div>
            <div className="portfolio-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                    <span>💡</span>
                    <span>{t('portfolio.tip')}</span>
                </div>
            </div>
        </div>
    </div>);
};

export default PortfolioList;