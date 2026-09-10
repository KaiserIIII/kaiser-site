import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('continuous integration contract', () => {
  it('runs only safe, reproducible quality checks', () => {
    const workflow = readFileSync('.github/workflows/ci.yml', 'utf8');

    expect(workflow).toContain('npm ci');
    expect(workflow).toContain('npm run audit:public');
    expect(workflow).toContain('npm run check');
    expect(workflow).toContain('npm run build');
    expect(workflow).toContain('npm test -- --run');
    expect(workflow).not.toMatch(/cloudflared|tunnel|dns|secrets\./i);
  });
});
