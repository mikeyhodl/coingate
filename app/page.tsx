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
      <div className="overflow-x-auto bg-base-200">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Currency</th>
              <th>Price</th>
              <th>24 Hrs Change %</th>
              <th>Supply</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {assets.map((asset) => (
              <tr key={asset.id}>
                <th>
                  <label>{asset.rank}</label>
                </th>
                <td>
                  <Link href={`/currencies/${asset.id}`}>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            src={`https://cryptologos.cc/logos/${
                              asset.id
                            }-${asset.symbol.toLowerCase()}-logo.png`}
                            alt={asset.symbol}
                            height={500}
                            width={500}
                            className="w-20 h-20 bg-zinc-300 rounded-lg dark:bg-zinc-600"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{asset.name}</div>
                        <div className="text-sm opacity-50">{asset.symbol}</div>
                      </div>
                    </div>
                  </Link>
                </td>
                <td>
                  $ {asset.priceUsd}
                  {/* <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span> */}
                </td>
                <td>{asset.changePercent24Hr}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    {asset.supply}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </>
  );
}
