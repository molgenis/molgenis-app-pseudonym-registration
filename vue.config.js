const ZipPlugin = require('zip-webpack-plugin');
const {
  name: appName,
  description: appDescription,
  version: appVersion
} = require('./package.json');
const GenerateJsonWebpackPlugin = require('generate-json-webpack-plugin');

const PROXY_TARGET = 'https://master.dev.molgenis.org';
const runtimeCompiler = true;
const outputDir = 'dist';
const publicPath =
  process.env.NODE_ENV === 'production' ? '/plugin/app/' + appName : '/';

const devServer = {
  // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
  host: process.env.JENKINS_AGENT_NAME || 'localhost',
  // Used to proxy a external API server to have someone to talk to during development
  proxy: process.env.NODE_ENV !== 'development' ? undefined : {
    '/login': {
      target: PROXY_TARGET,
      changeOrigin: true
    },
    '/api': {
      target: PROXY_TARGET,
      changeOrigin: true
    },
    '/logout': {
      target: PROXY_TARGET,
      changeOrigin: true
    }
  }
};

let apiDevServerProxyConf = {
  target: PROXY_TARGET,
  keepOrigin: true
};

if (process.env.DATA_EXPLORER_DEV_PW) {
  apiDevServerProxyConf.auth = 'admin:' + process.env.DATA_EXPLORER_DEV_PW;
}

function configureWebpack(config) {
  config.plugins.push(
    new GenerateJsonWebpackPlugin('config.json', {
      name: appName,
      label: appName,
      description: appDescription,
      version: appVersion,
      apiDependency: 'v2',
      includeMenuAndFooter: true,
      runtimeOptions: {
        language: 'en',
      }
    }),
    new ZipPlugin({
      filename: `${appName}.v${appVersion}`
    })
  );
}

const now = new Date();
const buildDate = now.toUTCString();


function chainWebpack(config) {
  const previewText = `package-name: ${appName}
    build-date: ${buildDate}
    PR: ${process.env.CHANGE_ID}
    BUILD: ${process.env.BUILD_NUMBER}`;

  config.resolve.symlinks(false);
  config
    .plugin('html')
    .tap(args => {
      args[0].template = htmlTemplate();
      args[0].version = process.env.NODE_ENV !== 'production' ? previewText : '';
      return args;
    });
}

function htmlTemplate() {
  if (process.env.NODE_ENV === 'production') {
    return 'apptemplate/app-template.html';
  }
  if (process.env.NODE_ENV === 'development') {
    return 'public/index.html';
  }
  if (process.env.NODE_ENV === 'test') {
    return 'public/preview.html';
  }
}

module.exports = {
  chainWebpack,
  devServer,
  runtimeCompiler,
  outputDir,
  publicPath,
  configureWebpack
};

