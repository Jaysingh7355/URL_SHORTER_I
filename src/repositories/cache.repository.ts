import { serverConfig } from "../config";
import { redisClient } from "../config/radis";

export class CacheRepository {
  async getNextId(): Promise<number> {
    const key = serverConfig.REDIS_COUNTER_KEY;
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    const result = await redisClient.incr(key);
    return result;
  }
  async setUrlMapping(shortUrl: string, originalUrl: string): Promise<void> {
    const key = "url:${shortUrl}";
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    await redisClient.set(key, originalUrl, { EX: 86400 });
    return;
  }

  async DeleteUrlMapping(shortUrl: string): Promise<void> {
    const key = "url:${shortUrl}";  
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    await redisClient.del(key);
    return;
  } 
}
