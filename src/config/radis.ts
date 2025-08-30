import { serverConfig } from ".";
import { createClient } from "redis";

export const redisClient = createClient({
  url: serverConfig.REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis  Error", err));

redisClient.on("connect", () => console.log("Redis  Connected"));

export async function initRedis() {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Redis connection error:", error);
    throw error;
  }
}

export async function closeRedis() {
  await redisClient.quit();
}
