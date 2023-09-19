"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Logo from "./logo.svg";
import Image from "next/image";

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

export default function Nav() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [TotalMarketCap, setTotalMarketCap] = useState<number>(0); // Initialize TotalMarketCap with 0

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => {
        setAssets(data.data);

        const totalMarketCap = data.data.reduce(
          (total: number, asset: Asset) => {
            return total + parseFloat(asset.marketCapUsd);
          },
          0
        );

        setTotalMarketCap(totalMarketCap);
      });
  }, []);

  return (
    <>
      <div className="navbar bg-emerald-400 sticky top-0 z-30">
        <div className="navbar-end">
          <h1 className="card-title mr-10">
            Market Cap: $
            {!isNaN(parseFloat(TotalMarketCap.toString()))
              ? parseFloat(TotalMarketCap.toString()).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              : "N/A"}
          </h1>
          <Link href="/" className="btn btn-glass normal-case text-xl">
            <Image src={Logo} alt="Logo" height={40} width={100} />
          </Link>
        </div>
      </div>
    </>
  );
}
