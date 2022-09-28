import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { changePlaylist } from "../slices/playListSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import { useEffect } from "react";

const Center = () => {
  const { data: session }: any = useSession();
  const playlistId = useAppSelector(
    (store: RootState) => store.playlistId.value
  );
  const playlist = useAppSelector((store: RootState) => store.playlist.value);
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
    <div className="text-white flex-grow p-5 h-screen">
      <header className="flex space-x-3 absolute cursor-pointer hover:opacity-80 opacity-90 items-center bg-violet-500 top-5 right-8 p-1 rounded-full pr-3">
        <img src={session?.user.image} className="w-10 h-10 rounded-full" />
        <p>{session?.user.name}</p>
        <ChevronDownIcon className="w-5 h-5" />
      </header>

      <div className="flex gap-5 pt-10 items-end">
        <img src={playlist?.images?.[0].url} className="w-32 h-32" />
        <div>
          <p>PLAYLIST</p>
          <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            {playlist?.name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Center;
