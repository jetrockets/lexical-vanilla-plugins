export default {
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'LexicalVanillaPlugins',
      fileName: 'lexical-vanilla-plugins',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'lexical',
        '@lexical/list',
        '@lexical/link',
        '@lexical/html',
        '@lexical/selection',
        '@lexical/utils',
        '@lexical/rich-text',
        '@lexical/dragon',
        '@lexical/history'
      ]
    }
  }
}
