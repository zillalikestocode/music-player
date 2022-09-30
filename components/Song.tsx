import { useAppDispatch, useAppSelector } from "../hooks";
import useSpotify from "../hooks/useSpotify";
import { change, set } from "../slices/songSlice";
import { RootState } from "../store";

function milli(millisec: any) {
  const minutes = Math.floor(millisec / 60000);
  const seconds: any = ((millisec % 60000) / 1000).toFixed(0);

  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const Song = ({ track, order }: any) => {
  const spotifyApi = useSpotify();
  const currentTrack = useAppSelector(
    (store: RootState) => store.currentTrack.value
  );
  const isPlaying = useAppSelector((store: RootState) => store.isPlaying.value);
  const dispatch = useAppDispatch();

  const playSong = () => {
    dispatch(change(track?.track?.id));
    dispatch(set(true));
    spotifyApi.play({
      uris: [track?.track?.uri],
    });
  };
  return (
    <div
      className="grid cursor-pointer hover:bg-gray-900 grid-cols-2 py-4 px-5"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}.</p>
        <img src={track?.track?.album?.images?.[0].url} className="w-12 h-12" />
        <div className="w-32">
          <p className="truncate">{track?.track?.name}</p>
          <p className="text-sm text-gray-600">
            {track?.track?.artists[0]?.name}
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden md:inline w-44 truncate text-gray-700">
          {track?.track?.album?.name}
        </p>
        <p className="text-sm">{milli(track?.track?.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
