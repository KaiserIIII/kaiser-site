import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('built homepage', () => {
  it('contains the public page shell', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    expect(html).toContain('<main');
    expect(html).toContain('KAISER');
  });

  it('contains the public chapters and accessibility hooks', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    const css = readdirSync('dist/_astro')
      .filter((file) => file.endsWith('.css'))
      .map((file) => readFileSync(`dist/_astro/${file}`, 'utf8'))
      .join('\n');
    expect(html).toContain('id="profile"');
    expect(html).toContain('id="journey"');
    expect(html).toContain('id="builds"');
    expect(html).toContain('id="signals"');
    expect(html).toContain('id="contact"');
    expect(html).toContain('Skip to content');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('renders every public project detail route', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    expect(html).toContain('03 / BUILDS');
    expect(html).toContain('Personal Agent Knowledge Base');
    for (const slug of ['personal-agent-knowledge-base', 'qldevicecheck', 'construction-cost-analyzer', 'cardcraft']) {
      expect(existsSync(`dist/projects/${slug}/index.html`)).toBe(true);
    }
  });
});
