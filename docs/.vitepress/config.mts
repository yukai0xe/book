import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Techincal Skills",
  description: "A Site with lots of techincal details",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'JavaScript', link: '/javascript' }
    ],

    sidebar: {
      '/': [{
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }],
      '/javascript/': [
        {
          text: 'Inroduction',
          items: [
            { text: 'JavaScript 是什麼？', link: '/javascript/what-is-javascript' }
          ]
        },
        {
          text: '基礎語法與認知',
          items: [
            { text: '變數宣告', link: '/javascript/變數宣告' },
            { text: '資料型別', link: '/javascript/資料型別' },
            { text: '運算式與運算子', link: '/javascript/運算式與運算子' },
            { text: '流程判斷與迴圈', link: '/javascript/流程判斷與迴圈' },
            { text: '語法技巧', link: '/javascript/語法技巧' },
            { text: '記憶體探討', link: '/javascript/記憶體探討' },
          ]
        },
        {
          text: '進階使用',
          items: [
            { text: '進階 Array', link: '/javascript/進階 Array' },
            { text: '進階 Function', link: '/javascript/進階 Function' },
            { text: '進階 Object', link: '/javascript/進階 Object' },
            { text: '同步非同步', link: '/javascript/同步非同步' },
            { text: '網頁操作案例', link: '/javascript/網頁操作案例' }
          ]
        }
      ],
      'vue': [],
      'react': [],
      'typescript': [],
      'nodejs': [],
      'flask': [],
      'chatbot': [],
      'commandLine': []
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  }
})
