

"use client";


import {  Suspense } from "react";

import { motion } from "framer-motion";
import VotingBooth from "../voting-booth/page";


import "../voting-booth/voting-booth.css";


export default function VotingBoothPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VotingBooth />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
