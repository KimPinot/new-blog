import Link from "next/link";
import Image from "./Image";

export function Header() {
  return (
    <header>
      <div className="page-content pb-0 flex items-center justify-between">
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
          <Link href="/category">
            <a className="btn btn-ghost btn-xs">
              <span className="text-md hover:text-primary transition-[color]">Category</span>
            </a>
          </Link>
          <Link href="/notes">
            <a className="btn btn-ghost btn-xs">
              <span className="text-md hover:text-primary transition-[color]">Notes</span>
            </a>
          </Link>
          <Link href="/cv">
            <a className="btn btn-ghost btn-xs">
              <span className="text-md hover:text-primary transition-[color]">CV</span>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
