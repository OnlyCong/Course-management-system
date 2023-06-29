module.exports = {
  lintOnSave: false,
  publicPath: "./",
  devServer: {
    // https: true,
    // port: 8080,
    open: true, // opens browser window automatically
    proxy: {
      "/python": {
        target: "http://localhost:7777",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/python": ""
        }
      },
      "/api":{
        target:'http://127.0.0.1:8888/api/private/v1/'
      },
      "/dbapi":{
        // target: 'http://localhost:3000/',
        target: 'http://127.0.0.1:3000/',

        pathRewrite: {
          "^/dbapi": ""
        }

      }

    },
  },
  productionSourceMap: false,
  runtimeCompiler: true,
  transpileDependencies: [],
};
