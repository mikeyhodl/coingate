import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-30">
        {/* <div className="flex-1">
          <Link href="/" className="btn btn-glass normal-case text-xl">
            CoinGate
          </Link>
        </div> */}
        <div className="navbar-end hidden lg:flex">
          {/* <ul className="menu menu-horizontal px-1"> */}
          {/* <li> */}
          <Link href="/" className="btn mr-2">
            Coins
          </Link>
          <Link href="/exchanges" className="btn mr-2">
            Exchanges
          </Link>
          {/* </li> */}
          {/* <li> */}
          <Link href="/markets" className="btn mr-2">
            Markets
          </Link>
          {/* </li> */}
          {/* <li> */}
          <Link href="/" className="btn mr-2">
            History
          </Link>
          {/* </li> */}
          {/* </ul> */}
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
