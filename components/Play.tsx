import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { set, change } from "../slices/songSlice";
import { RootState } from "../store";

const Play = () => {
  const currentTrack = useAppSelector(
    (store: RootState) => store.currentTrack.value
  );
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const dispatch = useAppDispatch();
  const track: any = useSongInfo();
  const fetchCurrentSong = () => {
    if (!track) {
      spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
        dispatch(change(data.body?.item?.id));

        spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
          dispatch(set(data.body?.is_playing));
        });
      });
    }
  };
  const handlePlay = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body.is_playing) {
        spotifyApi.pause();
        dispatch(set(false));
      } else {
        spotifyApi.play();
        dispatch(set(true));
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrack) {
      fetchCurrentSong();
    }
  }, [currentTrack, spotifyApi, session]);

  const isPlaying = useAppSelector((store: RootState) => store.isPlaying.value);
  return (
    <div className="text-white grid grid-cols-3 p-3 px-5 bg-black">
      <div className="flex items-center space-x-4">
        <img className="w-10 h-10" src={track?.album?.images?.[0].url} />
        <div className="text-sm">
          <p>{track?.name}</p>
          <p className="text-xs text-gray-600">{track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly cursor-pointer ">
        <RewindIcon className="w-5 h-5" />
        <div>
          {isPlaying ? (
            <PauseIcon
              onClick={handlePlay}
              className="w-10 h-10 cursor-pointer hover:scale-[1.2]"
            />
          ) : (
            <PlayIcon
              onClick={handlePlay}
              className="w-10 h-10 cursor-pointer hover:scale-[1.2]"
            />
          )}
        </div>
        <FastForwardIcon
          onClick={() => spotifyApi.skipToNext()}
          className="w-5 cursor-pointer h-5"
        />
      </div>
    </div>
  );
};

export default Play;
