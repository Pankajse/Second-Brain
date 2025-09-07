export function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // Case 1: Short link (youtu.be/<id>)
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1); // remove leading "/"
    }

    // Case 2: Standard watch link (youtube.com/watch?v=<id>)
    if (parsedUrl.hostname.includes("youtube.com")) {
      // If it's a standard watch link
      const vParam = parsedUrl.searchParams.get("v");
      if (vParam) return vParam;

      // Case 3: Embed link (youtube.com/embed/<id>)
      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.split("/")[2];
      }

      // Case 4: Shorts link (youtube.com/shorts/<id>)
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/")[2];
      }

      // Case 5: Live link (youtube.com/live/<id>)
      if (parsedUrl.pathname.startsWith("/live/")) {
        return parsedUrl.pathname.split("/")[2];
      }
    }

    return null; // not a recognized YouTube URL
  } catch (err) {
    return null; // invalid URL format
  }
}

export function extractTweetId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const segments = parsedUrl.pathname.split("/");

    const statusIndex = segments.findIndex(segment => segment === "status");
    const tweetId = segments[statusIndex + 1];

    if (statusIndex !== -1 && tweetId && /^\d+$/.test(tweetId)) {
      return tweetId;
    }

    return null; // not a valid tweet link
  } catch (err) {
    return null; // invalid URL
  }
}

