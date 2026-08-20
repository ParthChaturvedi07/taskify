import Image from "next/image";
import * as React from "react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
    </div>
  );
}