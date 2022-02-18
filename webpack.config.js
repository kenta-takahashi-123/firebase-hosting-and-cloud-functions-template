const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const AutoPrefixer = require('autoprefixer');

const buildPath = {
  src: {
    script: path.join(__dirname, 'src/script/'),
    style: path.join(__dirname, 'src/style/'),
    html: path.join(__dirname, 'src/'),
  },
  destRoot: path.join(__dirname, 'public/'),
};

function listFiles(_src) {
  const src = _src.replace(/\/$/g, '');
  return fs.readdirSync(src).map(x => {
    let pathString = `${src}/${x}`;
    if (fs.statSync(pathString).isDirectory()) {
      return listFiles(pathString);
    } else {
      return [pathString];
    }
  }).reduce((x, y) => x.concat(y, [])); // flatMap
}

module.exports = (values, argv) => {
  const env = values['NODE_ENV'];
  const isDevelopment = argv.mode === 'development';
  const envFile = path.resolve(__dirname, '.env.' + env)

  console.log('webpack mode: ' + argv.mode + ', env: ' + env);
  console.log('env file: ' + envFile)
  console.log('env contents are here')
  console.log(require('fs').readFileSync(envFile, 'utf-8'))

  console.log("target browsers: ");
  console.log(require("browserslist")().map(x => "  - " + x).join("\n"));

  const HTMLs = listFiles(buildPath.src.html)
      .filter(x => x.match(/.*\.html$/))
      .map(x => x.replace(buildPath.src.html, "")
  );
  console.log(HTMLs);
  let HtmlWebpackPlugins = HTMLs.map(entryName => new HtmlWebpackPlugin({
    variables: {
      env: isDevelopment ? 'development' : 'production'
    },
    inject: true,
    filename: buildPath.destRoot + entryName,
    template: buildPath.src.html + entryName
  }));

  return {
    resolve: {
      extensions: [".ts"]
    },
    entry: [
      path.join(buildPath.src.script, 'main.ts'),
      path.join(buildPath.src.style, 'main.scss')
    ],
    output: {
      path: buildPath.destRoot,
      filename: 'main.js',
    },
    plugins: [
      new Dotenv({path: envFile}),
      new MiniCssExtractPlugin({
        filename: 'main.css',
      })
    ].concat(HtmlWebpackPlugins),
    devtool: isDevelopment ? 'inline-source-map' : false,
    optimization: {
      minimizer: isDevelopment ? [] : [
        new TerserPlugin(),
        new CssMinimizerPlugin()
      ]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.(jpg|png|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[ext]'
          }
        },
        {
          test: /(fontawesome-webfont)\.(svg|eot|woff|woff2|ttf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[ext]'
          },
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevelopment
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDevelopment,
                postcssOptions: {
                  plugins: [
                    [AutoPrefixer, { grid: true }],
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
                implementation: require('sass')
              }
            }
          ]
        }
      ]
    }
  };
};
