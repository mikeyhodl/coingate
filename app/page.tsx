"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { number } from "prop-types";
import Image from "next/image";
// import Reloader from "@/app/components/reloader";
import Loading from "@/app/components/loading";

interface Asset {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: number;
  maxSupply: number;
  marketCapUsd: number;
  volumeUsd24Hr: Number;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: number;
  explorer: string;
}

export default function Home() {
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

  return (
    <>
      {/* <Header /> */}
      <section className="bg-white dark:bg-zinc-900">
        <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 h-max">
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 2xl:grid-cols-12 lg:grid-cols-7 md:grid-cols-3 sm:grid-cols-2">
            {assets.map((asset) => (
              <div className="w-full" key={asset.id}>
                <Link href={`/currencies/${asset.id}`}>
                  <Image
                    src={`https://cryptologos.cc/logos/${
                      asset.id
                    }-${asset.symbol.toLowerCase()}-logo.png`}
                    alt={asset.symbol}
                    height={500}
                    width={500}
                    className="w-20 h-20 bg-zinc-300 rounded-lg dark:bg-zinc-600"
                  />
                  {/* <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white lg:text-1xl mb-2.5">
                    {asset.name}
                  </h1> */}
                  <p className="text-1xl dark:text-white font-bold">
                    {asset.symbol}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
