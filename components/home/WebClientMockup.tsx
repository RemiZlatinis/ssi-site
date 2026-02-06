"use client";

import Image from "next/image";

export function WebClientMockup() {
  return (
    <div className="relative w-full mx-auto">
      {/* Monitor Frame */}
      <div className="relative bg-zinc-800 rounded-xl p-2 shadow-2xl">
        {/* Browser */}
        <div className="bg-zinc-700 rounded-t-lg px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 bg-zinc-600 rounded-md px-2 py-0.5 text-[10px] text-zinc-400 text-center">
            ssi-client-native.expo.app
          </div>
        </div>

        {/* Screen Content */}
        <div className="relative bg-zinc-900 rounded-b-lg overflow-hidden aspect-[16/9]">
          <Image
            src="/screenshots/web-app-screenshop.png"
            alt="SSI Web Dashboard"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Monitor Stand - Connected directly to frame */}
      <div className="flex flex-col items-center -mt-1">
        <div className="w-20 lg:w-48 h-4 lg:h-6 bg-zinc-700" />
        <div className="w-28 lg:w-64 h-2 lg:h-3 bg-zinc-600 rounded-full mt-0" />
      </div>
    </div>
  );
}
