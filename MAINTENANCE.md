# 維護指南

本文件說明如何維護和更新 Apps Download Web V3。

---

## 📱 更新應用程式資訊

### 資料檔案位置

`public/api/versions.json`

### 資料格式

```json
{
  "lastUpdated": "2026-01-09",
  "apps": [
    {
      "id": "financeapp",
      "name": "FinanceApp",
      "displayName": "智慧理財助手",
      "version": "1.0.0",
      "releaseDate": "2026-01-07",
      "platforms": {
        "android": {
          "version": "1.0.0",
          "minSdk": 28,
          "size": "15MB",
          "downloadUrl": "https://example.com/download"
        },
        "ios": {
          "version": "1.0.0",
          "minOS": "iOS 15.0",
          "storeUrl": "https://apps.apple.com/..."
        }
      },
      "changelog": [
        {
          "version": "1.0.0",
          "date": "2026-01-07",
          "changes": ["首次發布", "支援 Android"]
        }
      ]
    }
  ]
}
```

### 欄位說明

| 欄位 | 說明 |
|------|------|
| `id` | 唯一識別碼,用於 URL 路徑 |
| `name` | 應用程式英文名稱 |
| `displayName` | 顯示名稱 (中文) |
| `version` | 目前版本號 |
| `releaseDate` | 發布日期 |
| `platforms` | 支援平台資訊 |
| `changelog` | 版本更新記錄 |

---

## ➕ 新增應用程式

### 步驟 1: 準備圖示

將圖示放入 `public/assets/`:

- `{id}-icon-192.png` (192x192)

### 步驟 2: 更新資料

在 `versions.json` 的 `apps` 陣列新增:

```json
{
  "id": "newapp",
  "name": "NewApp",
  "displayName": "新應用程式",
  "version": "1.0.0",
  "releaseDate": "2026-01-09",
  "platforms": { ... },
  "changelog": [ ... ]
}
```

### 步驟 3: 提交變更

```bash
git add .
git commit -m "feat: add new app"
git push
```

GitHub Actions 會自動重新部署。

---

## 🔄 更新版本

1. 修改 `versions.json` 中的 `version` 欄位
2. 在 `changelog` 陣列開頭新增版本記錄
3. 更新 `lastUpdated` 日期
4. 提交並推送

---

## 🎨 修改樣式

全域樣式位於 `src/styles/global.css`

### 主題顏色

```css
:root {
  --accent-color: #6366f1;  /* 主色調 */
  --bg-color: #0f172a;      /* 背景色 */
  --text-primary: #f8fafc;  /* 主文字色 */
}
```

---

## ❓ 常見問題

### Q: 圖片沒有顯示?

**A**: 確認圖片路徑正確,檔名符合 `{id}-icon-192.png` 格式。

### Q: 新應用程式沒有出現?

**A**: 確認 JSON 格式正確,無語法錯誤。

### Q: 部署失敗?

**A**: 檢查 GitHub Actions 日誌,參考 DEPLOYMENT.md 疑難排解。

---

## 🛠 開發指令

```bash
npm run dev      # 本地開發
npm run build    # 建置測試
npm run preview  # 預覽建置結果
```
