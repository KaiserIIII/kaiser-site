import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('public portfolio atelier', () => {
  const root=resolve('public/explore');
  const html=readFileSync(resolve(root,'index.html'),'utf8');
  const css=readFileSync(resolve(root,'styles.css'),'utf8');
  const data=readFileSync(resolve(root,'data.js'),'utf8');
  const app=readFileSync(resolve(root,'app.js'),'utf8');
  it('publishes a dependency-free interactive route', () => {
    expect(existsSync(resolve(root,'favicon.svg'))).toBe(true);
    expect(existsSync(resolve(root,'cover.svg'))).toBe(true);
    expect(html).toContain('id="relationship-graph"');
    expect(html).toContain('id="command-dialog"');
    expect(html).toContain('src="./data.js"');
    expect(html).toContain('src="./app.js"');
    expect(css).toContain('prefers-reduced-motion');
    expect(app).toContain('setPointerCapture');
    expect(app).toContain('renderCommandResults');
  });
  it('is personal, bilingual and publicly sourced',()=>{
    expect(data).toContain('Northeast Forestry University');
    expect(data).toContain('东北林业大学');
    expect(data).toContain('CardCraft');
    expect(data).toContain('MigrationWitness');
    expect(html).not.toContain('For recruiters / HR');
    expect(html).not.toContain('Graduate admissions');
    expect(data).not.toContain('KaiserIIII/CampusScopePro');
    expect(data).not.toContain('KaiserIIII/route-utility-gap');
  });
});
