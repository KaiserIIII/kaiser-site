import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
describe('public interactive experience', () => {
  const file = resolve('public/explore/index.html');
  it('has an accessible static entry route', () => {
    expect(existsSync(file)).toBe(true);
    const html = readFileSync(file, 'utf-8');
    expect(html).toContain('<svg id="graph"');
    expect(html).toContain('prefers-reduced-motion');
    expect(html).toContain('aria-pressed');
    expect(html).toContain('pointermove');
    expect(html).toContain('requestAnimationFrame(tick)');
    expect(html).not.toContain('<script src=');
  });
  it('avoids private repositories', () => {
    const html = readFileSync(file, 'utf-8');
    expect(html).not.toContain('KaiserIIII/CampusScopePro');
    expect(html).not.toContain('KaiserIIII/route-utility-gap');
  });
});
