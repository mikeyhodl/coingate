import Link from "next/link";
import Logo from "./logo.svg";
import Image from "next/image";

export default function Nav() {
  return (
    <>
      <div className="navbar bg-emerald-400 sticky top-0 z-30">
        <div className="navbar-end">
          <Link href="/" className="btn btn-glass normal-case text-xl">
            <Image src={Logo} alt="Logo" height={40} width={100} />
          </Link>
        </div>
      </div>
    </>
  );
}
