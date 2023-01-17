/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 2,
      features: {
        'nesting-rules': true,
      },
    }),
  ],
};
