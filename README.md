## 快速开始

如果您没有`ejs` 与`less` 的渲染器，请先安装： [hexo-renderer-ejs](https://github.com/hexojs/hexo-renderer-ejs) 和 [hexo-renderer-less](https://github.com/hexojs/hexo-renderer-less)。

```sh
npm install --save hexo-renderer-less hexo-renderer-ejs
```

或者

```sh
yarn add hexo-renderer-less hexo-renderer-ejs
```

## 安装主题

### Git 安裝

在博客根目录里安装最新版【推荐】

```sh
git clone https://github.com/theme-simple/hexo-theme-simple.git themes/simple
```

然后进入 `theme/simple` 目录，安装依赖：

```sh
pnpm add
```
> 如果你有在使用 [ni](https://github.com/antfu/ni) 的话，可以直接执行 `ni` 命令安装依赖。

## 应用主题

修改博客根目录下的 `_config.yml`，把 `theme` 的值修改为 `simple`：

```yml
theme: simple
```

## 使用主题

不论你是开发者还是用户，此步骤都是必须要做的，这样才能保证你在使用主题时不会遇到问题。

首先进入 `themes/simple` 目录，然后执行：

```sh
pnpm run dev
```
> 如果你有在使用 [ni](https://github.com/antfu/ni) 的话，可以直接执行 `nr dev` 命令。

为什么非要做这一步呢？因为主题集成了 [UnoCSS](https://github.com/unocss/unocss)，这是一个原子化 CSS 框架，它会根据你的使用情况，自动移除未使用的 CSS，这样可以大大减少 CSS 的体积，提高网页加载速度。主题`80%`以上的样式都是使用了 [UnoCSS](https://github.com/unocss/unocss) 。

所以不管你是要开发主题还是编写文章，都需要先执行一下这个命令。