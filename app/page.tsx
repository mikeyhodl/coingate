"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { number } from "prop-types";
// import Reloader from "@/app/components/reloader";
import Loading from "@/app/components/loading";

interface Asset {
  id: number;
  rank: string;
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
      <section className="bg-white dark:bg-stone-900">
        <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 h-max">
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 2xl:grid-cols-12 lg:grid-cols-7 md:grid-cols-3 sm:grid-cols-2">
            {assets.map((asset) => (
              <div className="w-full" key={asset.id}>
                <Link href={`/assets/${asset.id}`}>
                  <img
                    src="https://logosave.com/images/large/common/02/bitcoin.png"
                    className="w-20 h-20 bg-stone-300 rounded-lg dark:bg-stone-600"
                  />
                  {/* <h1 className="text-2xl font-semibold text-stone-800 dark:text-white lg:text-1xl mb-2.5">
                    {asset.name}
                  </h1> */}
                  <p className="text-1xl dark:text-white font-bold">
                    {asset.name}
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
