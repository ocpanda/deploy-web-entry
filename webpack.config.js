import path from 'path'

export default {
  entry: path.join(path.resolve(), './src/index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(path.resolve(), './dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
}
