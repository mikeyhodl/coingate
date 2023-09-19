import Link from "next/link";
import Hotimage from "./hot.svg";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-30">
        <div className="navbar-end hidden lg:flex">
          <Link href="/" className="btn mr-2">
            Coins
          </Link>
          <Link href="/exchanges" className="btn mr-2">
            Exchanges
          </Link>
          <Link href="/markets" className="btn mr-2">
            Markets
          </Link>
          <Link href="/hotlist" className="btn mr-2">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>CoinWatch</span>
              <Image src={Hotimage} alt="Logo" height={24} width={24} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
