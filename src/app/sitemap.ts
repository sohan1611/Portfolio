import { MetadataRoute } from 'next';
import { portfolioData } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const changeFrequency = 'monthly' as const;

  return [
    {
      url: portfolioData.personal.siteUrl,
      changeFrequency,
      priority: 1,
    },
    ...portfolioData.projects.map((project) => ({
      url: `${portfolioData.personal.siteUrl}/projects/${project.slug}`,
      changeFrequency,
      priority: 0.7,
    })),
  ];
}
