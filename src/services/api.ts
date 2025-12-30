import { Asset } from "../store/portfolios/types";

const API_KEY = process.env.REACT_APP_COINCAP_API_KEY || '';

function fetcher(url: string, options = {}) {
    const updateOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        }
    };
    return fetch(url, updateOptions);
}

type CoinCapRateResponse = {
    data: {
        "id": string,
        "symbol": string,
        "rateUsd": string,
        "type": string
    }
};

export async function fetchAssetPrice(id: string): Promise<Asset> {
    if (!API_KEY) {
        throw new Error('API key not configured. Please add your CoinCap API key in src/services/api.ts');
    }

    const response = await fetcher(`https://rest.coincap.io/v3/rates/${id}`);

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid API key. Please check your CoinCap API key configuration');
        }
        throw new Error(`Failed to fetch asset: ${response.statusText}`);
    }

    const data : CoinCapRateResponse = await response.json();
    return {
        id: data.data.id,
        name: data.data.symbol,
        price: parseFloat(data.data.rateUsd)
    };
}