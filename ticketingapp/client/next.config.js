module.exports = {
  webpack: (config) => {
    //next llooks for changing code for 300ms
    config.watchOptions.poll = 300;
    return config;
  },
};
