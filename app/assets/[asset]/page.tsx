"use client";

// import fetch from "next/fetch";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import Reloader from "@/app/components/reloader";
// import Link from "next/link";
// import Header from "@/app/components/header";
// import Hls from "hls.js";
// import { useRef } from "react";

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

export default function AssetPage() {
  //   const audioRef = useRef<HTMLAudioElement | null>(null); // Declare audioRef

  const params = useParams();
  // const id = params.get("id") as string;
  // console.log(params.track);
  const id = params.asset;

  const [asset, setAsset] = useState<Asset | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
      setAsset(await response.json());
    };

    fetchAsset();
  }, [id]);

  // Render the track details
  return (
    // <div>
    //   <p>Asset data</p>
    //   {asset && (
    //     <div>
    //       <h1>{asset.name}</h1>
    //       <p>{asset.rank}</p>
    //       <p>{asset.symbol}</p>
    //     </div>
    //   )}
    // </div>
    <>
      <section className="bg-white dark:bg-gray-900 bg-gradient-to-r from-violet-500 to-fuchsia">
        <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 h-max">
          <section className="bg-white dark:bg-gray-900 xl:h-screen lg:h-screen bg-gradient-to-r from-violet-500 to-fuchsia">
            <div className="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
              <div className="flex justify-center xl:w-1/3 sm:pt-20 xl:pt-32 md:pt-10"></div>
              <div className="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white pb-2.5">
                  {asset.rank}
                </h2>
                <h2 className="text-1xl font-bold tracking-tight text-gray-800 xl:text-1xl dark:text-white pb-4">
                  Asset : {asset.name}
                </h2>
                <h2 className="text-1xl font-bold tracking-tight text-gray-800 xl:text-1xl dark:text-white pb-8">
                  Genre : {asset.id}
                </h2>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
