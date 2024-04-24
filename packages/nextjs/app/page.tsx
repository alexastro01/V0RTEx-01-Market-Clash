"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { AuroraBackground } from "~~/components/ui/aurora-background";
import { AuroraHeader } from "~~/components/AuroraHeader";
import { ThreeDCardDemo } from "~~/components/CardDemo";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
    <ThreeDCardDemo />
    </>
  );
};

export default Home;
