import redisClient from "../config/redisClient.js";

export async function withCache(key, ttl, fetchFn) {
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    const result = await fetchFn();
    await redisClient.set(key, JSON.stringify(result), "EX", ttl);
    return result;
  } catch (err) {
    return await fetchFn();
  }
}
