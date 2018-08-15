// Override webpack.config.js, provided by @ionic/app-scripts package.
const path = require('path');
const fs = require('fs');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
const DEFAULT_ENV_FILE_PATH = '/../src/config/environment.prod.ts';

module.exports = function () {
  //Must set alias for both 'dev','prod' ,in the case we run ionic:serve --prod
  useDefaultConfig.prod.resolve.alias = {
    "@app/env": path.resolve(environmentPath()),
  };
  useDefaultConfig.dev.resolve.alias = {
    "@app/env": path.resolve(environmentPath()),
  };
  return useDefaultConfig;
};

function environmentPath(env) {

  const filePath =  __dirname + '/../src/config/environment.' + process.env.IONIC_ENV + '.ts';

  if (!fs.existsSync(filePath)) {
    console.log('Environment problem !!! :' + filePath + ' does not exist!');
    return __dirname + DEFAULT_ENV_FILE_PATH;
  } else {
    return filePath;
  }
}
