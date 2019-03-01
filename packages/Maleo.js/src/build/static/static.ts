// tslint:disable:no-console
import fs from 'fs';
import path from 'path';
import { StaticPages } from '@interfaces/build/IWebpackInterfaces';
import { render } from '@server/render';
import { BUILD_DIR, STATIC_BUILD_DIR } from '@constants/index';

/**
 * acquire corresponding pages which want to be exported as static html
 * render App, Wrap, & Document for each page
 * renderToString & dump it to file
 */
export const buildStatic = async (staticPages: StaticPages, dir: string) => {
  const cwd: string = path.resolve(dir);
  const assetDir: string = path.resolve(cwd, BUILD_DIR, 'client');
  const staticDir: string = path.resolve(cwd, STATIC_BUILD_DIR);
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }

  Object.keys(staticPages).map(async (p) => {
    const html = await renderStatic({ location: p, dir: assetDir });
    const pageName = p.substring(1, p.length);
    const pathStaticDir = path.resolve(cwd, STATIC_BUILD_DIR, `${pageName}.html`);

    fs.writeFile(pathStaticDir, html, (err) => {
      if (err) {
        console.error(`Error when write static html page ${pageName} to file`);
      } else {
        console.log(`Success create file ${pageName}`);
      }
    });
  });
};

export const renderStatic = async ({ location, dir }) => {
  // @ts-ignore
  return await render({ req: { originalUrl: location }, dir, res: {} });
};
