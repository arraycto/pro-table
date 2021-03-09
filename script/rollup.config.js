import packageJson from '../package.json';
// import imageBase64 from 'rollup-plugin-img';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import cssnano from 'cssnano';
import typescript from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';

import { PRO } from './constant';
const currentEnv = process.env.NODE_ENV;

const external = [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.peerDependencies)];

export default {
    input: './src/index.ts',
    output: [
        {
            file: 'lib/index.cjs.js', // 输出的文件
            format: 'cjs', // 格式化方式,cjs=>CommonJS
            sourcemap: true// 是否生成sourcemap
        },
        {
            file: 'es/index.es.js',
            format: 'es',
            sourcemap: true
        }
    ],
    external,
    plugins: [
        clear({ targets: ['es', 'lib', 'types'] }),
        resolve(),
        commonjs({
            include: 'node_modules/**'
        }),
        postcss({
            extract: false,
            use: ['sass'],
            plugins: [cssnano()]
        }),
        typescript({
            useTsconfigDeclarationDir: true
        }),
        babel({
            babelrc: false,
            include: ['src/**/*'],
            runtimeHelpers: true,
            presets: [
                ['@babel/env', { modules: false, useBuiltIns: 'usage', corejs: '3' }],
                '@babel/react',
            ],
            plugins: [
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-proposal-class-properties'
            ]
        }),
        ...[
            currentEnv === PRO && terser(),
            currentEnv === PRO &&
                visualizer({
                    filename: 'visualizer/index.html'
                })
        ].filter(item => item)
    ],
    watch: {
        exclude: 'node_modules/**',
        include: 'src/**'
    }
};
