import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react";


const HEADER_COLORS = [
  "from-red-600",
  "from-orange-600",
  "from-yellow-600",
  "from-green-600",
  "from-blue-600",
  "from-indigo-600",
  "from-violet-600"
];

export const Main = () => {
  const [headerBgColor, setHeaderBgColor] = useState<string>();

  useEffect(() => {
    const randomBgColor = HEADER_COLORS[Math.floor(Math.random() * HEADER_COLORS.length)]
    setHeaderBgColor(randomBgColor);
  }, []);

  const { data: session } = useSession();
  return (
    <div className="flex-grow h-screen w-[82.5%] overflow-y-scroll scrollbar-hide">
      <header className="absolute top-0 right-0">
        <div className=" text-white bg-black flex space-x-3 items-center opacity-85 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img src={session?.user?.image} alt="user" className="rounded-full w-10 h-10" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black h-80 ${headerBgColor}`}>
        <img src="" alt="Header Background" />
      </section>

    </div>
  )
}