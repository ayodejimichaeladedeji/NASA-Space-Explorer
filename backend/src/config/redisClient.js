import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL);
console.log("Connecting to Redis at", process.env.REDIS_URL);
redisClient.on("connect", () => console.log("🔌 Redis connected"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));

export default redisClient;