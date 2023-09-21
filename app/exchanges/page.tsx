"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import Reloader from "@/app/components/reloader";
import Loading from "@/app/components/loading";

interface Exchange {
  exchangeId: string;
  name: string;
  rank: string;
  percentTotalVolume: string;
  volumeUsd: string;
  tradingPairs: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  socket: string;
  exchangeUrl: string;
  updated: string;
}

export default function Exchange() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  useEffect(() => {
    fetch(`${process.env.API_URL}/exchanges`)
      .then((response) => response.json())
      .then((data) => {
        setExchanges(data.data);
      });
  }, []);

  if (!exchanges.length) {
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
              <th>Exchange</th>
              <th>Volume (USD)</th>
              <th>Volume (%)</th>
              <th>Trading Pairs</th>
              <th>Website</th>
              {/* <th>Volume(24hrs)</th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {exchanges.map((exchange) => (
              <tr key={exchange.name}>
                <th>
                  <label>{exchange.rank}</label>
                </th>
                <td>
                  <Link href={`/exchanges/${exchange.exchangeId}`}>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        {/* <div className="rounded-full ring ring-offset-base-100 ring-offset-1 w-12 h-12"> */}
                        <div
                          className={`${
                            parseFloat(exchange.percentTotalVolume) > 0
                              ? "ring-success"
                              : "ring-error"
                          } rounded-full ring ring-offset-base-100 ring-offset-1 w-12 h-12`}
                        >
                          <Image
                            src="https://assets.coincap.io/assets/icons/btc@2x.png"
                            alt={exchange.exchangeId}
                            height={500}
                            width={500}
                            className="w-20 h-20 bg-zinc-300 rounded-lg dark:bg-zinc-600"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{exchange.name}</div>
                        <div className="text-sm opacity-50">
                          {exchange.exchangeId}
                        </div>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="font-bold">
                  {" "}
                  $
                  {!isNaN(parseFloat(exchange.volumeUsd))
                    ? parseFloat(exchange.volumeUsd).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "N/A"}
                  {/* <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span> */}
                </td>
                <td className="font-bold">
                  {" "}
                  {!isNaN(parseFloat(exchange.percentTotalVolume))
                    ? parseFloat(exchange.percentTotalVolume).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )
                    : "N/A"}
                  %
                </td>
                <td className="font-medium">{exchange.tradingPairs}</td>
                <a href={exchange.exchangeUrl} target="_blank">
                  <td className="font-medium">
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
                  </td>
                </a>

                {/* <td className="font-medium">{exchange.tradingPairs}</td> */}
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </>
  );
}
