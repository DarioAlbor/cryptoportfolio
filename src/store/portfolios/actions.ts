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