import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { viteBundler } from "@vuepress/bundler-vite";
// import { ohmylive2dPlugin } from "vuepress-plugin-oh-my-live2d";
import {
  canvasPlugin,
  CanvasPluginType,
} from "./plugins/vuepress-plugin-canvas";
import { live2DAssistPlugin } from "./plugins/vuepress-plugin-live2DAssist";
import { gradientCoverPlugin } from "./plugins/vuepress-plugin-gradient-cover";
import theme from "./theme2.js";
import { popperPlugin } from "./plugins/vuepress-plugin-popper";
import { PopperShape } from "@moefy-canvas/theme-popper";
import { hitokotoPlugin } from "./plugins/vuepress-plugin-hitokoto";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import metingPlugin from "vuepress-plugin-meting2";

const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "博客演示",
      description: "vuepress-theme-hope 的博客演示",
    },
  },
  head: [["meta", { name: "referrer", content: "no-referrer-when-downgrade" }]],
  alias: {
    "@MyLink": path.resolve(__dirname, "./components/Mylink.vue"),
    "@MyCoverLink": path.resolve(__dirname, "./components/MyCoverLink.vue"),
    "@Design": path.resolve(__dirname, "./data/design.ts"),
    "@Api": path.resolve(__dirname, "./data/api.ts"),
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue",
    ),
  },

  theme: theme,

  port: 8080,

  bundler: viteBundler({
    viteOptions: {
      server: {
        proxy: {
          "/bing": {
            target: "https://cn.bing.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/bing/, ""),
          },
        },
      },
    },
    // vuePluginOptions: {},
  }),
  plugins: [
    metingPlugin({
      metingOptions: {
        global: true,
        server: "tencent",
        api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r",
        type: "playlist",
        mid: "851947617",
      },
    }),
    // 代码高亮
    shikiPlugin({
      theme: "one-dark-pro",
    }),
    // 一言插件
    hitokotoPlugin({}),
    // 鼠标特效插件
    popperPlugin({
      config: {
        shape: PopperShape.Star,
        size: 1.95,
        numParticles: 8,
      },
    }),
    // 看板娘辅助插件
    live2DAssistPlugin({
      subPageHidden: true,
    }),
    // 背景插件
    canvasPlugin({
      type: CanvasPluginType.Figure,
      ribbonOption: {
        zIndex: 1,
        alpha: 0.8,
        size: 90,
      },
    }),
    // 遮罩插件
    gradientCoverPlugin({}),
    // 谷歌统计
    googleAnalyticsPlugin({
      // 配置项
      id: "G-R1WPVQFH8L",
      debug: true,
    }),
    // 看板娘插件
    // ohmylive2dPlugin({
    //   // 在这里进行配置
    //   source: "https://cdn.jsdelivr.net/gh/oragekk/blog-assets/live2D",
    //   models: [
    //     {
    //       scale: 0.44,
    //       path: "/sipeibojue_5/sipeibojue_5.model3.json",
    //     },
    //     {
    //       scale: 0.4,
    //       path: "/lafei_4/lafei_4.model3.json",
    //     },
    //     {
    //       scale: 1.0,
    //       path: "/z46_2/z46_2.model3.json",
    //     },
    //   ],
    //   tips: {
    //     style: {
    //       width: 150,
    //       height: 100,
    //       offsetX: 0,
    //       offsetY: 90,
    //     },
    //   },
    // }),
  ],
  // Enable it with pwa
  shouldPrefetch: false,
});
