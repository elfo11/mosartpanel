module.exports = {
  devServer: {
    proxy: 'https://localhost:8080/index.html',
    https: true,
  },
  publicPath: ''
}