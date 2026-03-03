"use client";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Button className="bg-red-500 px-[1.2rem] h-[3rem]" disabled={false} variant="primary" onClick={() => alert("Button clicked!")}>Dale clic</Button>
      </main>
    </div>
  );
}
