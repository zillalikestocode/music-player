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
    <div className="border-gray-900 border-r mb-24 sm:max-w-[12rem] hidden md:inline-flex lg:max-w-[15rem] text-xs lg:text-sm h-screen overflow-y-scroll scrollbar-hide p-5 text-gray-500">
      <div className="space-y-3">
        <p className="flex itemx-center gap-2">
          <LibraryIcon className="w-5 h-5" />
          Playlists
        </p>
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
