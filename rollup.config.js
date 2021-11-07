/*
 * Copyright © 2021. Kingsrook LLC <contact@kingsrook.com>.  All Rights Reserved.
 */

import typescript from 'rollup-plugin-typescript2'

export default [
    {
        input: './src/qqq-frontend-core.ts',
        output: {
            file: './lib/qqq-frontend-core.esm.js',
            format: 'esm',
        },
        plugins: [typescript()],
    },
    {
        input: './src/qqq-frontend-core.ts',
        output: {
            file: './lib/qqq-frontend-core.js',
            format: 'cjs',
        },
        plugins: [typescript()],
    },
]