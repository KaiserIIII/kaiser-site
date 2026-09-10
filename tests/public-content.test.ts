import { describe, expect, it } from 'vitest';
import { profile } from '../src/data/profile';
import { projects } from '../src/data/projects';

describe('public profile', () => {
  it('contains only approved public identity fields', () => {
    expect(profile.name).toBe('于越');
    expect(profile.englishName).toBe('Yue Yu');
    expect(profile.github).toBe('KaiserIIII');
    expect(JSON.stringify(profile)).not.toMatch(/2024214925|2006-03-28|kaiser@nefu\.edu\.cn/);
  });

  it('has a linkable project record for every published project', () => {
    expect(projects.length).toBeGreaterThanOrEqual(4);
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(project.title.length).toBeGreaterThan(2);
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.status).toMatch(/^(active|selected|exploratory|coursework)$/);
    }
  });
});
