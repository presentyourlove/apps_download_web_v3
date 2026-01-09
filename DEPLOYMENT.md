# 部署說明

本文件說明如何部署 Apps Download Web V3 至 GitHub Pages。

---

## 🚀 自動部署 (GitHub Actions)

專案已配置 GitHub Actions 自動部署,每次推送到 `main` 分支時自動執行。

### Workflow 檔案

`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
```

---

## ⚙️ GitHub Pages 設定

### 初次設定步驟

1. 前往 Repository Settings > Pages
2. **Source**: 選擇 `GitHub Actions`
3. 儲存設定

### 驗證部署

部署完成後,訪問:

```
https://presentyourlove.github.io/apps_download_web_v3/
```

---

## 🔧 Astro 設定

關鍵設定位於 `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://presentyourlove.github.io',
  base: '/apps_download_web_v3',
  output: 'static',
  integrations: [sitemap()]
});
```

- `site`: 網站完整 URL
- `base`: 子路徑 (repository 名稱)
- `output`: 靜態生成模式

---

## 🐛 疑難排解

### 建置失敗

**問題**: `Cannot find package 'lightningcss'`
**解決**: 移除 `astro.config.mjs` 中的 `vite.build.cssMinify` 設定

**問題**: `fetch failed` 在 getStaticPaths
**解決**: 使用 `fs.readFileSync()` 讀取本地 JSON 檔案

### 路徑錯誤

**問題**: 圖片或連結 404
**解決**: 確保路徑拼接包含斜線:

```javascript
// 正確
`${import.meta.env.BASE_URL}/assets/icon.png`

// 錯誤
`${import.meta.env.BASE_URL}assets/icon.png`
```

---

## 📋 手動部署

如需手動部署:

```bash
# 建置
npm run build

# 上傳 dist/ 目錄內容至 GitHub Pages
```
