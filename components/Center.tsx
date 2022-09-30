import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { changePlaylist } from "../slices/playListSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import { useEffect } from "react";
import Songs from "./Songs";

const Center = () => {
  const { data: session }: any = useSession();
  const playlistId = useAppSelector(
    (store: RootState) => store.playlistId.value
  );
  const playlist: any = useAppSelector((store: RootState) => store.playlist.value);
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (playlistId) {
      spotifyApi.getPlaylist(playlistId).then((data: any) => {
        dispatch(changePlaylist(data.body));
      });
    }
  }, [playlistId]);

  return (
    <div className="text-white flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header
        onClick={() => signOut()}
        className="flex space-x-3 absolute cursor-pointer hover:opacity-80 opacity-90 items-center bg-violet-500 top-5 right-8 p-1 rounded-full pr-3"
      >
        <img src={session?.user.image} className="w-10 h-10 rounded-full" />
        <p>{session?.user.name}</p>
        <LogoutIcon className="w-5 h-5" />
      </header>

      {playlistId ? (
        <div className="flex gap-5 p-5 pt-10 items-end">
          <img src={playlist?.images?.[0].url} className="w-32 h-32" />
          <div>
            <p>PLAYLIST</p>
            <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {playlist?.name}
            </h4>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full mt-12 items-center flex-col space-y-5">
          <img src="https://links.papareact.com/9xl" className="w-32 h-32" />
          <p className="text-xl md:text-2xl">Choose a Playlist</p>
          <div className="text-gray-600">
            <h4 className="text-center mb-1 text-gray-300">
              Instructions on how to play a song
            </h4>
            <ul className="text-xs md:text-sm w-96 space-y-2">
              <li>You should have an active Spotify Premium account </li>
              <li>
                Open Spotify on any device which you wish to play the songs on
              </li>
              <li>Preferrably, play a song and pause on the device</li>
              <li>
                You can now play and pause songs from the remote music player
              </li>
            </ul>
          </div>
        </div>
      )}
      <Songs />
    </div>
  );
};

export default Center;
