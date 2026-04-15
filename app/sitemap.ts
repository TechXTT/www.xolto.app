import type { MetadataRoute } from 'next';
import { siteURL } from './site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteURL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
