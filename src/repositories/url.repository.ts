import { IUrl, Url } from "../models/Url";

export interface createUrl {
  originalUrl: string;
  shortUrl: string;
}

export interface UrlStates {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UrlRepository {
  async create(data: createUrl): Promise<IUrl> {
    const url = new Url(data);
    return await url.save();
  }
  async findByShortUrl(shortUrl: string): Promise<IUrl | null> {
    return await Url.findOne({ shortUrl: shortUrl });
  }

  async findAll() {
    const urls = await Url.find()
      .select({
        _id: 1,
        originalUrl: 1,
        shortUrl: 1,
        clicks: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .sort({ createdAt: -1 });
    return urls.map((url) => ({
      id: url._id?.toString() || "",
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    }));
  }

  async incrementClicks(shortUrl: string) {
    await Url.findOneAndUpdate({ shortUrl: shortUrl }, { $inc: { clicks: 1 } });
    return;
  }



  async findStatsByShortUrl(shortUrl:string) {
    const url  = await Url.findOne({ shortUrl: shortUrl }).select({
      _id: 1,
      originalUrl: 1,
      shortUrl: 1,
      clicks: 1,
      createdAt: 1,
      updatedAt: 1,
    }); 
    if(!url) return null;
    return {
      id: url._id?.toString() || "",
      originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        clicks: url.clicks,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt

  }
}

}
