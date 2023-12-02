import * as process from 'process';

export default () => ({
  api: {
    url: process.env.APP_SERVICE_URL,
    port: parseInt(process.env.APP_SERVICE_PORT, 10) || 3000,
    basePath: process.env.APP_SERVICE_BASEPATH,
  },
  product: {
    basePath: process.env.PRODUCT_BASEPATH,
    path: {
      search: process.env.PRODUCT_PATH_SEARCH,
    },
  },
});
