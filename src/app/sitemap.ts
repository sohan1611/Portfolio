import { MetadataRoute } from 'next';
import { portfolioData } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const changeFrequency = 'monthly' as const;

  return [
    {
      url: portfolioData.personal.siteUrl,
      lastModified,
      changeFrequency,
      priority: 1,
    },
    ...portfolioData.projects.map((project) => ({
      url: `${portfolioData.personal.siteUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency,
      priority: 0.7,
    })),
  ];
}
