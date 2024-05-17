const fs = require("fs");
const path = require("path")
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relationPath => path.resolve(appDirectory, relationPath);

module.exports = {
  appWebpackConfig: resolveApp("webpack.config.js")
}
