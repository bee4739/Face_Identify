const env = require(`./environments/${process.env.MODE}`);
const path = require("path");

module.exports = {
  basePath: env.basePath,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  trailingSlash: true,
  env: {
    mode: process.env.MODE
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty"
      };
    }
    return config;
  }
};
