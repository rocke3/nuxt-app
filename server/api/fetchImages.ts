export default defineEventHandler(async (event) => {
  const { answer } = await readBody(event);
  const config = useRuntimeConfig();

  const GOOGLE_API_KEY = config.GOOGLE_API_KEY;
  const GOOGLE_CX_ID = config.GOOGLE_CX_ID;

  const fetchImageForAnswer = async (query: string) => {
    try {
      console.log("Fetching image for query:", query);
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
          query
        )}&searchType=image&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX_ID}`
      );
      const data = await res.json();
      console.log(data);
      return data.items?.[0]?.link || "";
    } catch (e) {
      console.error("Error fetching image:", e);
      return "";
    }
  };

  const imageUrl = await fetchImageForAnswer(answer);
  return { imageUrl };
});
