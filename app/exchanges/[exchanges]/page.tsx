"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/loading";
import Link from "next/link";
import Image from "next/image";

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

export default function ExchangePage() {
  const params = useParams();
  const xid = params.exchanges;

  const [exchange, setExchange] = useState<Exchange | null>(null);

  useEffect(() => {
    const fetchExchange = async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/exchanges/${xid}`
      );
      const responseData = await response.json();
      setExchange(responseData.data);
    };

    fetchExchange();
  }, [xid]);

  if (!exchange) {
    return <Loading />;
  }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {exchange && (
              <>
                <h1 className="text-5xl font-bold">{exchange.name}</h1>
                <p className="py-6">Exchange Information</p>
                <Link href="/exchanges">
                  <button className="btn btn-primary">Exchanges</button>
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
                      parseFloat(exchange.percentTotalVolume) > 0
                        ? "ring-success"
                        : "ring-error"
                    } rounded-full ring ring-offset-base-100 ring-offset-1 w-12 h-12`}
                  >
                    <Image
                      src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                      alt={exchange.exchangeId}
                      height={500}
                      width={500}
                      className="w-20 h-20 bg-zinc-300 rounded-lg dark:bg-zinc-600"
                    />
                  </div>
                </div>
              </div>
              <div className="stat-title">Volume</div>
              <div className="stat-value">
                $
                {!isNaN(parseFloat(exchange.volumeUsd))
                  ? parseFloat(exchange.volumeUsd).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "N/A"}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-primary">
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
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
              </div>
              <div className="stat-title">Rank</div>
              <div className="stat-value text-primary">{exchange.rank}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Explorer</div>
              <a href={exchange.exchangeUrl} target="_blank">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
