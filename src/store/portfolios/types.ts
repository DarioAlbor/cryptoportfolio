export type Asset = {
    id: string;
    name: string;
    price: number;
}

export type OwnedAsset = Asset & {
    quantity: number;
}

export type PortfolioState = {
    assets: OwnedAsset[];
    loading: boolean;
    error?: string;
}

export function calculateTotal(asset: OwnedAsset): number {
    return asset.price * asset.quantity;
}