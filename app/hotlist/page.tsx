"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/app/components/loading";

interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export default function HotList() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => {
        setAssets(data.data);
      });
  }, []);

  if (!assets.length) {
    return <Loading />;
  }

  // Filter assets where changePercent24Hr is more than 5
  const filteredAssets = assets.filter(
    (asset) => parseFloat(asset.changePercent24Hr) > 2
  );

  if (!assets.length) {
    return <Loading />;
  }
  return (
    <>
      <div className="h-screen">
        <h1 className="text-3xl font-bold text-center">Coins of The Day</h1>
        <section className="m-6 grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="card w-72 bg-yellow-100 text-primary-content m-6"
            >
              <div className="card-body">
                <h2 className="card-title">{asset.name}</h2>
                <p className="font-medium">Symbol: {asset.symbol}</p>
                <p className="font-medium">
                  Price: $
                  {!isNaN(parseFloat(asset.priceUsd))
                    ? parseFloat(asset.priceUsd).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "N/A"}
                </p>
                <p className="font-medium">
                  Change (24Hr):{" "}
                  {!isNaN(parseFloat(asset.changePercent24Hr))
                    ? `${parseFloat(asset.changePercent24Hr).toFixed(2)}`
                    : "N/A"}
                  %
                </p>
                {/* Add more asset information here */}
                <div className="card-actions justify-end">
                  <a
                    href={`https://www.binance.com/en/trade/${asset.symbol.toUpperCase()}_USDT?theme=dark&type=spot`}
                    target="_blank"
                  >
                    <button className="btn btn-neutral">
                      Buy {asset.symbol}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
