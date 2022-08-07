import Link from "next/link";
import Image from "./Image";

export function Header() {
  return (
    <header>
      <div className="container pt-5 px-5 mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="avatar w-16 h-16 btn btn-square btn-xs btn-ghost">
            <Image src="/assets/avatar.png" alt="" layout="fill" />
          </a>
        </Link>
        <div className="flex">
          <Link href="/">
            <a className="btn btn-ghost btn-xs">
              <span className="text-md hover:text-primary transition-[color]">Posts</span>
            </a>
          </Link>
          <Link href="/about">
            <a className="btn btn-ghost btn-xs">
              <span className="text-md hover:text-primary transition-[color]">About</span>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
