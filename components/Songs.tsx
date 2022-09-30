import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import Song from "./Song";

const Songs = () => {
  const playlist: any = useAppSelector(
    (store: RootState) => store.playlist.value
  );

  return (
    <div className="mb-24">
      {playlist?.tracks?.items?.map((track: any, i: number) => {
        return <Song key={track?.track?.id} order={i} track={track} />;
      })}
    </div>
  );
};

export default Songs;
