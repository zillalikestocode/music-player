//@tsc-nocheck
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  RssIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { RootState } from "../store";
import { changeId } from "../slices/playListSlice";

const Sidebar = () => {
  const [playlist, setPlaylist] = useState([]);
  const dispatch = useAppDispatch();
  const playlistId = useAppSelector(
    (state: RootState) => state.playlistId.value
  );

  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="border-gray-900 sm:max-w-[12rem] hidden md:inline-flex lg:max-w-[15rem] text-xs lg:text-sm h-screen overflow-y-scroll scrollbar-hide p-5 text-gray-500">
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
        {playlist?.map((playlist: any) => {
          return (
            <button
              onClick={() => {
                dispatch(changeId(playlist.id));
              }}
              className={`flex text-left gap-3 hover:text-white ${
                playlistId === playlist.id && "text-indigo-500"
              }`}
            >
              {playlist?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
