import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

const useSpotify = () => {
  const { data: session }: any = useSession();
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_SECRET,
  });
  useEffect(() => {
    if (session) {
      if (session?.user.error === "RefreshAccessTokenError") {
        signIn();
      }
    }
    spotifyApi.setAccessToken(session?.user.accessToken);
  }, [session, spotifyApi]);
  return spotifyApi;
};

export default useSpotify;
