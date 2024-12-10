export type CryptoCoin = {
    id: string;
    name: string;
    symbol: string;
    price: number;
    percentChange24h: number;
    percentChange7d: number;
    percentChange30d: string;
    marketCap: number | null;
    circulatingSupply: number | null;
    maxSupply: number | null;
    fullyDilutedMarketCap: number | null;
    tvl: number | null;
    circAsPercentageOfMax: string;
    impliedFDMC: string;
    mcTVL: string;
    fcmcTVL: string;
};
