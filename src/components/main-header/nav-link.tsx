"use client";

import styles from "./nav-link.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export default function NavLink(props: Readonly<Props>) {
  const { href, children } = props;
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href) ? `${styles.active} ${styles.link}` : styles.link
      }
    >
      {children}
    </Link>
  );
}
