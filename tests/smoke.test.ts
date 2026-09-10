import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('built homepage', () => {
  it('contains the public page shell', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    expect(html).toContain('<main');
    expect(html).toContain('KAISER');
  });
});
