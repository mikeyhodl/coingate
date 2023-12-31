"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/loading";
import Link from "next/link";
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

export default function AssetPage() {
  //   const audioRef = useRef<HTMLAudioElement | null>(null); // Declare audioRef

  const params = useParams();
  // const id = params.get("id") as string;
  // console.log(params.track);
  const uid = params.asset;

  const [asset, setAsset] = useState<Asset | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const response = await fetch(`${process.env.API_URL}/assets/${uid}`);
      const responseData = await response.json();
      setAsset(responseData.data);
    };

    fetchAsset();
  }, [uid]);

  if (!asset) {
    return <Loading />;
  }
  // Render the track details
  return (
    <>
      <div className="hero min-h-screen bg-base-200 h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {asset && (
              <>
                <h1 className="text-5xl font-bold">{asset.name}</h1>
                <p className="py-6">Asset Information</p>
                <Link href="/">
                  <button className="btn btn-primary">Currencies</button>
                </Link>
              </>
            )}
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar">
                  <div
                    className={`${
                      parseFloat(asset.changePercent24Hr) > 0
                        ? "ring-success"
                        : "ring-error"
                    } rounded-full ring ring-offset-base-100 ring-offset-1 w-12 h-12`}
                  >
                    <Image
                      src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                      alt={asset.symbol}
                      height={500}
                      width={500}
                      className="w-20 h-20 bg-zinc-300 rounded-lg dark:bg-zinc-600"
                    />
                  </div>
                </div>
              </div>
              <div className="stat-title">24Hr Change</div>
              <div
                className={`${
                  parseFloat(asset.changePercent24Hr) > 0
                    ? "text-green-500"
                    : "text-red-600"
                } stat-value`}
              >
                {!isNaN(parseFloat(asset.changePercent24Hr))
                  ? `${parseFloat(asset.changePercent24Hr).toFixed(2)}%`
                  : "N/A"}
              </div>
              {/* <div className="stat-desc text-secondary">31 tasks remaining</div> */}
            </div>
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Current Price</div>
              <div className="stat-value text-primary">
                $
                {!isNaN(parseFloat(asset.priceUsd))
                  ? parseFloat(asset.priceUsd).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "N/A"}
              </div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>

            <div className="stat">
              {/* <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div> */}
              <div className="stat-title">Explorer</div>
              <a href={asset.explorer} target="_blank">
                <button className="btn btn-outline btn-accent mt-2">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                  Explorer
                </button>
              </a>

              {/* <div className="stat-value text-secondary">2.6M</div> */}
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
