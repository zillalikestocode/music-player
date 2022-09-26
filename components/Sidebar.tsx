import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  RssIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session, status } = useSession();

  console.log(session);
  return (
    <div className="border-gray-900 p-5 text-sm text-gray-500">
      <div className="space-y-3">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 hover:text-white"
        >
          <p>Logout</p>
        </button>
        <button className="flex items-center gap-3 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center gap-3 hover:text-white">
          <SearchIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center gap-3 hover:text-white">
          <LibraryIcon className="w-5 h-5" />
          <p>Libraries</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center gap-3 hover:text-white">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center gap-3 hover:text-white">
          <HeartIcon className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center gap-3 hover:text-white">
          <RssIcon className="w-5 h-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>
    </div>
  );
};

export default Sidebar;
