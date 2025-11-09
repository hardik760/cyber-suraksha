import fs from 'fs';
import path from 'path';

let demoDataCache: any = null;

/**
 * Load demo data from public/demo_data.json
 * Cached after first load for performance
 */
export function getDemoData() {
  if (demoDataCache) {
    return demoDataCache;
  }

  const filePath = path.join(process.cwd(), 'public', 'demo_data.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  demoDataCache = JSON.parse(fileContent);

  return demoDataCache;
}
