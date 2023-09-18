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
            <tr className="font-bold">
              <th>
                <label>rank</label>
              </th>
              <th>Currency</th>
              <th>Price</th>
              <th>24 Hrs Change %</th>
              <th>Supply</th>
              <th>Market Cap</th>
              <th>Volume(24hrs)</th>
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
                        {/* <div className="rounded-full ring ring-offset-base-100 ring-offset-1 w-12 h-12"> */}
                        <div
                          className={`${
                            parseFloat(asset.changePercent24Hr) > 0
                              ? "ring-success"
                              : "ring-error"
                          } rounded-full ring ring-offset-base-100 ring-offset-1 w-12 h-12`}
                        >
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
                <td className="font-bold">
                  {" "}
                  $
                  {!isNaN(parseFloat(asset.priceUsd))
                    ? parseFloat(asset.priceUsd).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "N/A"}
                  {/* <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span> */}
                </td>
                <td
                  className={
                    parseFloat(asset.changePercent24Hr) > 0
                      ? "font-medium text-green-500"
                      : "font-medium text-red-600"
                  }
                >
                  {!isNaN(parseFloat(asset.changePercent24Hr))
                    ? `${parseFloat(asset.changePercent24Hr).toFixed(2)}`
                    : "N/A"}{" "}
                  %
                </td>
                <td className="font-medium">
                  {!isNaN(parseFloat(asset.supply))
                    ? parseFloat(asset.supply).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "N/A"}
                </td>
                <td className="font-medium">
                  {!isNaN(parseFloat(asset.marketCapUsd))
                    ? parseFloat(asset.marketCapUsd).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "N/A"}
                </td>
                <td className="font-medium">
                  {!isNaN(parseFloat(asset.volumeUsd24Hr))
                    ? parseFloat(asset.volumeUsd24Hr).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )
                    : "N/A"}
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
