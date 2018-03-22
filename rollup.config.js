import buble from 'rollup-plugin-buble'

export default {
  input: './src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    sourcemap: false,
    strict: true
  },
  plugins: [
    buble()
  ]
}
