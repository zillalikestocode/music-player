import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import useSpotify from "./useSpotify";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const currentTrack = useAppSelector(
    (store: RootState) => store.currentTrack.value
  );
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    async function fetchSongInfo() {
      if (currentTrack) {
        const info: any = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        )
          .then((res) => res.json())
          .catch((err) => console.log(err));
        setSongInfo(info);
      }
    }
    fetchSongInfo();
  }, [currentTrack, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
