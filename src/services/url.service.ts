import { create } from 'domain';
import { CacheRepository } from './../repositories/cache.repository';
import { UrlRepository } from './../repositories/url.repository';
export class UrlService {
  constructor(private readonly UrlRepository: UrlRepository, private readonly CacheRepository: CacheRepository) {
  }

  async createShortUrl(originalUrl: string): Promise<string> {
    const nextId = await this.CacheRepository.getNextId();
    
    return '';
  }
}
