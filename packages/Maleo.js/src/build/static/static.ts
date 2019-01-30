// tslint:disable:no-console
import fs from 'fs';
import path from 'path';
import { StaticPages } from '@interfaces/build/IWebpackInterfaces';
import { renderStatic } from '@server/render';
import { requireRuntime } from '@utils/require';
import { BUILD_DIR } from '@src/constants/index';

export const buildStatic = (staticPages: StaticPages, dir: string) => {
  Object.keys(staticPages).map((p) => {
    const cwd: string = path.resolve(dir);
    const pagePath = path.resolve(cwd, staticPages[p].page);
    const page = requireRuntime(pagePath);
    const html = renderStatic({ Page: page });
    const pageName = p.substring(1, p.length);

    fs.writeFile(BUILD_DIR, html, (err) => {
      if (err) {
        console.error(`Error when write static html page ${pageName} to file`);
      } else {
        console.log(`Success create file ${pageName}`);
      }
    });
  });
};
