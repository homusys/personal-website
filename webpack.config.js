import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

export default {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    devtool: "eval-source-map",
    devServer: {
        static: "./dist",
        watchFiles: ["./src/index.html"]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.pdf$/i,
                type: "asset/resource",
                generator: {
                    filename: "[name].[contenthash][ext]",
                }
            },
        ],
    },
};