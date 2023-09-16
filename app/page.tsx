"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { number } from "prop-types";
// import Reloader from "@/app/components/reloader";
// import Header from "@/app/components/header";

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
    return (
      <>
        <div className="flex justify-center	items-center h-screen">
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            stroke="#000000"
            strokeWidth="0.0002"
            className="animate-spin"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill="#ff0000"
                d="M19.295346,12 C19.683732,11.997321 20,12.315434 20,12.7087815 L20,15.9132194 C20,16.3046684 19.6866632,16.6220005 19.3001428,16.6220005 C18.9136223,16.6220005 18.6002855,16.3046684 18.6002855,15.9132194 L18.6006646,14.7880072 C16.7783174,17.8441657 13.3981233,20 9.75558622,20 C5.34669464,20 1.65005079,17.2790232 0.0473577091,13.0847914 C-0.0921406706,12.7197255 0.0869918429,12.3092534 0.447461376,12.1679763 C0.80793091,12.0266992 1.21323498,12.2081158 1.35273336,12.5731817 C2.75210409,16.2353209 5.94083219,18.5824378 9.75558622,18.5824378 C13.1270432,18.5824378 16.2763668,16.4010153 17.7430824,13.4292559 L16.2715084,13.4386023 C15.884997,13.4412853 15.56952,13.1261356 15.566854,12.7346958 C15.5642216,12.343256 15.8754035,12.0237564 16.2619149,12.0210734 L19.295346,12 Z M10.2444138,0 C14.6533054,0 18.3499492,2.72097676 19.9526423,6.9152086 C20.0921407,7.28027447 19.9130082,7.69074656 19.5525386,7.83202368 C19.1920691,7.9733008 18.786765,7.79188418 18.6472666,7.4268183 C17.2478959,3.76467906 14.0591678,1.4175622 10.2444138,1.4175622 C6.87295684,1.4175622 3.72363319,3.59898468 2.25691759,6.57074409 L3.72849164,6.56139765 C4.11500304,6.5587147 4.43048002,6.87386439 4.43314598,7.26530419 C4.43577836,7.65674399 4.12459654,7.97624361 3.73808514,7.97892656 L0.704653993,8 C0.316268039,8.00267895 4.36983782e-13,7.68456603 4.36983782e-13,7.29121854 L4.36983782e-13,4.0867806 C4.36983782e-13,3.69533161 0.31333676,3.3779995 0.699857241,3.3779995 C1.08637772,3.3779995 1.39971448,3.69533161 1.39971448,4.0867806 L1.39933538,5.21199282 C3.22168264,2.1558343 6.60187665,0 10.2444138,0 Z"
              />{" "}
            </g>
          </svg>
        </div>
      </>
    );
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
