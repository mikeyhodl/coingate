"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/loading";
import Link from "next/link";
import Image from "next/image";

interface Market {
  exchangeId: string;
  baseId: string;
  quoteId: string;
  baseSymbol: string;
  quoteSymbol: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  volumePercent: string;
}

export default function MarketPage() {
  const params = useParams();
  const mid = params.markets;

  console.log(mid);

  const [markets, setMarkets] = useState<Market[]>([]); // Use an array for markets

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          `${process.env.API_URL}/assets/${mid}/markets`
        );
        const responseData = await response.json();
        setMarkets(responseData.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
  }, [mid]);

  if (markets.length === 0) {
    // Check if markets is an empty array
    return <Loading />;
  }
  return (
    <>
      <div className="overflow-x-auto bg-base-200 h-screen">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold">
              {/* <th>
                <label>Rank</label>
              </th> */}
              <th>Exchange</th>
              <th>Price (USD)</th>
              <th>Vol (24 hrs)</th>
              <th>Volume (%)</th>
              {/* <th>Market Cap</th> */}
              {/* <th>Volume(24hrs)</th> */}
            </tr>
          </thead>
          <tbody>
            {/* Render rows for each market */}
            {markets.map((market) => (
              <tr key={market.exchangeId}>
                <th>
                  <label>{market.exchangeId}</label>
                </th>
                <td>
                  {/* <Link href={`/markets/${market.id}`}> */}
                  <div className="flex items-center space-x-3">
                    {/* <div className="avatar">
                        <div className="rounded-full ring ring-offset-base-100 ring-offset-1 w-12 h-12"></div>
                      </div> */}
                    <div>
                      <div className="font-bold">
                        $
                        {!isNaN(parseFloat(market.priceUsd))
                          ? parseFloat(market.priceUsd).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          : "N/A"}
                      </div>
                      {/* <div className="text-sm opacity-50">{market.symbol}</div> */}
                    </div>
                  </div>
                  {/* </Link> */}
                </td>
                <td className="font-bold">
                  {" "}
                  $
                  {!isNaN(parseFloat(market.volumeUsd24Hr))
                    ? parseFloat(market.volumeUsd24Hr).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )
                    : "N/A"}
                </td>
                <td className="font-medium">
                  {!isNaN(parseFloat(market.volumePercent))
                    ? `${parseFloat(market.volumePercent).toFixed(2)}`
                    : "N/A"}{" "}
                  %
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </>
  );
}
