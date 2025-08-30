export function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function getYouTubeVideoId(url : string) {
  try {
    const parsedUrl = new URL(url);
    
    // Case 1: Short link (youtu.be/<id>)
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1); // remove leading "/"
    }

    // Case 2: Standard link (youtube.com/watch?v=<id>)
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    return null; // not a valid YouTube URL
  } catch (err) {
    return null; // invalid URL format
  }
}