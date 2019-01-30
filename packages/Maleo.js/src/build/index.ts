// tslint:disable:no-console

import webpack, { Configuration } from 'webpack';

import { createWebpackConfig, loadUserConfig } from './webpack/webpack';

import { IBuildOptions } from '@interfaces/build/IBuildOptions';
import { Context, CustomConfig, StaticPages } from '@interfaces/build/IWebpackInterfaces';
import { buildStatic } from '@build/static/static';

const cwd = process.cwd();

export const getUserConfig = (): CustomConfig => {
  return loadUserConfig(cwd);
};

export const getConfigs = (options: IBuildOptions, userConfig: CustomConfig): Configuration[] => {
  const { env, buildType } = options;

  const context: Context = {
    env,
    projectDir: cwd,
  };

  const clientConfig = createWebpackConfig({ isServer: false, ...context }, userConfig);
  const serverConfig = createWebpackConfig({ isServer: true, ...context }, userConfig);

  if (buildType === 'server') {
    return [serverConfig];
  }

  if (buildType === 'client') {
    return [clientConfig];
  }

  return [clientConfig, serverConfig];
};

export const build = (options: IBuildOptions) => {
  const userConfig = getUserConfig();

  // if user specify static page export, we need to build it parallelly alongside with webpack build
  if (userConfig.staticPages) {
    exportStatic(userConfig.staticPages);
  }

  compile(getConfigs(options, userConfig), options);
};

const exportStatic = (staticPages: StaticPages) => {
  try {
    console.log('[STATIC] Starting to export static pages');
    buildStatic(staticPages, cwd);
  } catch (error) {
    console.log('[STATIC] Error when tried to export static pages, error:', error);
  }
};

const compile = (configs: webpack.Configuration[], options: IBuildOptions) => {
  const { env, callback } = options;

  const webpackCompiler = webpack(configs);

  if (env === 'development') {
    webpackCompiler.run((err, stats) => {
      if (typeof callback === 'function') {
        return callback(err, stats);
      }

      if (err || stats.hasErrors()) {
        console.log(
          'Webpack compile failed! Error:',
          err || stats.toString({ colors: true, all: false, errors: true, errorDetails: true }),
        );

        return;
      }
    });
  } else {
    webpackCompiler.run((err: Error, stats: webpack.Stats) => {
      if (typeof callback === 'function') {
        return callback(err, stats);
      }

      if (err || stats.hasErrors()) {
        console.log(
          'Webpack compile failed! Error:',
          err || stats.toString({ colors: true, all: false, errors: true, errorDetails: true }),
        );
        return;
      }

      console.log(
        stats.toJson({
          assets: true,
        }),
      );
    });
  }
};
