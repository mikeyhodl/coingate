"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/loading";

interface Asset {
  exchangeId: string;
  baseId: string;
  quoteId: string;
  baseSymbol: string;
  quoteSymbol: string;
  volumeUsd24Hr: number;
  priceUsd: number;
  volumePercent: Number;
}

export default function MarketsPage() {
  //   const audioRef = useRef<HTMLAudioElement | null>(null); // Declare audioRef

  const params = useParams();
  // const id = params.get("id") as string;
  // console.log(params.track);
  const id = params.asset;

  const [asset, setAsset] = useState<Asset | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${id}/markets`
      );
      const responseData = await response.json();
      setAsset(responseData.data);
    };

    fetchAsset();
  }, [id]);

  if (!asset) {
    return <Loading />;
  }
  // Render the track details
  return (
    <div className="flex justify-center	items-center h-screen bg-white dark:bg-stone-900 dark:text-white">
      {asset && (
        <div>
          <h1>{asset.exchangeId}</h1>
          <p>{asset.quoteId}</p>
          <p>{asset.baseId}</p>
          <p>${asset.priceUsd}</p>
        </div>
      )}
    </div>
  );
}
