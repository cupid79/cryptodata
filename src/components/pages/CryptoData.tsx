import React, { useEffect, useState } from 'react';
import { CryptoCoin } from '@/utils/types';
import axios from 'axios';

import Icons from '../common/Icons';

import { Box, Button, Tabs } from '@chakra-ui/react';

const CryptoData: React.FC = () => {
    const [cryptoData, setCryptoData] = useState<CryptoCoin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<string>('DEX');

    const handleTabs = (_e: any, value: string): void => {
        return setSelectedTab(value);
    };

    const formatToMillions = (value: number): string => {
        if (value >= 1_000_000) {
            return `${Math.trunc(value / 1_000_000).toLocaleString()} m`;
        }
        return `${Math.trunc(value).toLocaleString()}`;
    };

    // const formatPercentages = (percentages: number): string => {
    //     return `${percentages.toFixed(2)} %`;
    // };

    const API_URL: string =
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
    const API_KEY = '6c69779d-77bd-4838-92de-6f341c65c13e';

    const symbols: string =
        'ETH,BNB,AVAX,OP,ARB,MATIC,SUI,SOL,TON,APT,NEAR,ATOM,TRX';

    const fetchData = async (): Promise<void> => {
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    'X-CMC_PRO_API_KEY': API_KEY,
                },
                params: {
                    symbol: symbols,
                    convert: 'USD',
                },
            });

            const data: CryptoCoin[] = Object.values(response.data.data).map(
                (coin: any) => ({
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol,
                    price: coin.quote.USD.price,
                    percentChange24h: coin.quote.USD.percent_change_24h,
                    percentChange7d: coin.quote.USD.percent_change_7d,
                    percentChange30d: coin.quote.USD.percent_change_30d || '0',
                    marketCap: coin.quote.USD.market_cap,
                    circulatingSupply: coin.circulating_supply,
                    maxSupply: coin.max_supply,
                    fullyDilutedMarketCap:
                        coin.quote.USD.fully_diluted_market_cap,
                    tvl: coin.quote.USD.tvl,
                    circAsPercentageOfMax: coin.max_supply
                        ? (
                              (coin.circulating_supply / coin.max_supply) *
                              100
                          ).toFixed(2)
                        : 'N/A',
                    impliedFDMC: coin.max_supply
                        ? (coin.max_supply * coin.quote.USD.price).toFixed(2)
                        : 'N/A',
                    mcTVL:
                        coin.marketCap && coin.fullyDilutedMarketCap
                            ? (
                                  coin.marketCap / coin.fullyDilutedMarketCap
                              ).toFixed(2)
                            : 'N/A',
                    fcmcTVL:
                        coin.marketCap && coin.fullyDilutedMarketCap
                            ? (
                                  coin.fullyDilutedMarketCap / coin.marketCap
                              ).toFixed(2)
                            : 'N/A',
                })
            );

            setCryptoData(data);
            setLoading(false);
        } catch (err: any) {
            setError(err.message || 'Error fetching data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className='text-center text-xl text-gray-500'>Loading...</div>
        );
    }

    if (error) {
        return (
            <div className='text-center text-xl text-red-500'>
                Error: {error}
            </div>
        );
    }

    return (
        <Box className='container mx-auto py-4'>
            <Box className='flex justify-between items-center mb-6'>
                <Box>
                    <h1 className='text-2xl font-semibold text-gray-800'>
                        Crypto Multiples
                    </h1>
                    <p className='text-sm text-gray-500'>
                        The best of the best!
                    </p>
                </Box>
                {/* <Box className='hidden flex items-center space-x-4'> */}
                <Box className='hidden items-center space-x-4'>
                    <Button className='flex items-center px-2 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200'>
                        <Icons icon='tabler:trash' />
                        Delete
                    </Button>
                    <Button className='flex items-center px-2 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200'>
                        <Icons icon='mynaui:filter-solid' />
                        Filters
                    </Button>
                    <Button className='flex items-center px-2 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200'>
                        <Icons icon='stash:cloud-arrow-down' />
                        Export
                    </Button>
                    <Button className='px-2 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
                        <Icons icon='mingcute:add-line' />
                        Add new CTA
                    </Button>
                </Box>
            </Box>

            <Box className='flex space-x-6 border-b border-gray-300 mb-6'>
                <Tabs.Root value={selectedTab} variant='plain'>
                    <Tabs.List>
                        {[
                            'DEX',
                            'L1',
                            'L2',
                            'EVM',
                            'Lending/Borrowing',
                            'AI',
                        ].map((tab, index) => (
                            <Tabs.Trigger
                                value={tab}
                                key={index}
                                onClick={(e) => handleTabs(e, tab)}
                                className={`px-2 py-2 ${
                                    selectedTab === tab
                                        ? 'text-blue-600 font-semibold'
                                        : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                {tab}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                </Tabs.Root>
            </Box>

            <Box className='overflow-x-auto'>
                <table className='min-w-full table-auto bg-white shadow-md rounded-lg'>
                    <thead>
                        <tr className='border-b'>
                            {/* <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                Name
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                Price
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                24H Change
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                7D Change
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                30D Change
                            </th> */}
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                Market Cap ($)
                            </th>
                            {/* <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                Circulating Supply (M)
                            </th> */}
                            {/* <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                Circ as % of Max
                            </th> */}
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                Implied FDMC ($)
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                TVL
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                Fees (1y)
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                Revenue
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                FDMC/TVL
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                FDMC/Fees
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                Token type
                            </th>
                            <th className='px-2 py-3 text-left text-sm font-semibold text-gray-600'>
                                MC/TVL
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptoData.map((coin: CryptoCoin, index: number) => (
                            <tr
                                key={coin.id}
                                className={`${
                                    index % 2 !== 0 && 'bg-[#f4f4f4]'
                                }`}
                            >
                                {/* <td className='px-2 py-4 text-sm text-gray-800 flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />
                                    <div className='size-5 bg-[#d9d9d9] rounded-full border-2' />
                                    {coin.name}
                                </td> */}

                                {/* <td className='px-2 py-4 text-sm text-gray-800'>
                                    ${coin.price.toFixed(2)}
                                </td> */}

                                {/* <td className={`px-2 py-4 text-sm`}>
                                    {Math.trunc(coin.percentChange24h)}%
                                    {formatPercentages(coin.percentChange24h)}
                                </td>

                                <td className={`px-2 py-4 text-sm`}>
                                    {Math.trunc(coin.percentChange7d)}%
                                    {formatPercentages(coin.percentChange7d)}
                                </td>

                                <td className='px-2 py-4 text-sm text-gray-800'>
                                    {Math.trunc(Number(coin.percentChange30d))}%
                                    {formatPercentages(
                                        Number(coin.percentChange30d)
                                    )}
                                </td> */}

                                <td className='px-2 py-4 text-sm text-gray-800'>
                                    {/* ${coin.marketCap?.toLocaleString()} */}
                                    {formatToMillions(coin.marketCap ?? 0)}
                                </td>

                                {/* <td className='px-2 py-4 text-sm text-gray-800'>
                                    {coin.circulatingSupply?.toLocaleString()}
                                </td> */}

                                {/* <td className='px-2 py-4 text-sm text-gray-800'>
                                    {coin.circAsPercentageOfMax !== 'N/A'
                                        ? formatPercentages(
                                              Number(coin.circAsPercentageOfMax)
                                          )
                                        :   Math.trunc(
                                                 Number(coin.circAsPercentageOfMax)
                                             )
                                          'N/A'}
                                </td> */}

                                <td className='px-2 py-4 text-sm text-gray-800'>
                                    {coin.circAsPercentageOfMax !== 'N/A'
                                        ? formatToMillions(
                                              Number(coin.impliedFDMC)
                                          )
                                        : 'N/A'}
                                </td>

                                <td className='px-2 py-4 text-sm'>
                                    {coin.tvl ?? '-'}
                                </td>

                                <td className='px-2 py-4 text-sm'>-</td>

                                <td className='px-2 py-4 text-sm'>-</td>

                                <td className='px-2 py-4 text-sm text-gray-800'>
                                    {coin.fcmcTVL}
                                </td>

                                <td className='px-2 py-4 text-sm'>-</td>

                                <td className='px-2 py-4 text-sm'>-</td>

                                <td className='px-2 py-4 text-sm text-gray-800'>
                                    {coin.mcTVL}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        </Box>
    );
};

export default CryptoData;
