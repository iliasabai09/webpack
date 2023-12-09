import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type mode = 'production' | 'development';

interface EnvVariables {
	mode: mode;
	port:number;
}

export default (env: EnvVariables) => {
	const isDev = env.mode === 'development';
	const config: webpack.Configuration = {
		mode: env.mode ?? 'development',
		entry: {
			main: './src/index.ts'
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				}
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: '[name].[contenthash].js',
			path: path.resolve(__dirname, 'build'),
			clean: true
		},
		plugins: [
			new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
			isDev && new webpack.ProgressPlugin()
		].filter(Boolean),
		devtool:'inline-source-map',
		devServer: isDev ? {
			port: env.port ?? 5000,
			open: true
		} : undefined
	}
	return config
}

