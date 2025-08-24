# 🔧 Git管理

## 1. ブランチ運用

| ブランチ | 用途 | 説明 |
|---------|------|------|
| `main` | 本番リリース | 常にリリース可能状態を維持 |
| `feat/<page>_<section>_<action>` | 機能追加 | 例: `feat/home_fv_add-motion` |
| `fix/<scope>_<action>` | バグ修正 | 例: `fix/frontend_form-validation` |
| `chore/<scope>_<action>` | 設定・依存更新 | 例: `chore/deps_update-packages` |
| `hotfix/<scope>_<action>` | 緊急修正 | 例: `hotfix/backend_critical-bug` |

## 2. コミットメッセージ

**Conventional Commits** 準拠（**英語**で記述）

```bash
# 形式
<type>(<scope>): <description>

# 例
feat(frontend/home): add hero section motion
fix(backend/auth): resolve token validation issue
chore(deps): update Next.js to 14.1.0
docs(readme): add Git management section
style(frontend): unify button styles
refactor(backend): refactor authentication logic
test(frontend): add home page tests
```

### コミットタイプ一覧
- `feat`: 新機能追加
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コードスタイル修正（機能に影響なし）
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: その他の変更（依存関係、ビルド設定など）

## 3. マージ方式

- **Squash & Merge** を原則とする
- 履歴を整理してからmainブランチに統合

## 4. PRルール

### 必須項目
- [ ] PRテンプレートの記入
  - 目的
  - 変更点
  - 確認手順
  - 影響範囲
  - リリース注意点

### UI変更時の追加要件
- [ ] スクリーンショット or 動画の添付
- [ ] レスポンシブ対応の確認

### 基本方針
- 小さなPRを高頻度でマージ
- 1つのPRで1つの機能・修正に集中

## 5. CI / Lint / Build

### 実行コマンド
```bash
# フロントエンド
pnpm -C frontend lint
pnpm -C frontend build

# バックエンド
pnpm -C backend build

# 型チェック（mainブランチのみ）
pnpm run typecheck
```

### 品質担保
- **Husky pre-push** で `pnpm run check` を強制実行
- mainブランチでは `typecheck` も実行

## 6. ENV / Secrets管理

### 環境変数
- `.env` ファイルは **Git禁止**
- `env.example` を更新（キー名のみ、値は空）

### シークレット管理
- **Vercel** / **Railway** で管理
- `preview` / `production` 環境を分離

## 7. DBマイグレーション

| 環境 | コマンド | 注意事項 |
|------|----------|----------|
| 開発 | `prisma migrate dev` | ローカルDBに適用 |
| 本番 | `prisma migrate deploy` | 本番DBに適用 |
| 破壊的変更時 | - | **バックアップ必須** |

## 8. リリース管理

### タグ運用
- 本番昇格時のみタグ付与（`vX.Y.Z`）
- セマンティックバージョニング準拠

### ロールバック
- タグチェックアウト → 再デプロイ
- 緊急時は即座に対応可能

## 9. ホットフィックス

### 緊急修正フロー
1. `hotfix/*` ブランチ作成
2. 最小差分で修正
3. Squash & Merge
4. 手動デプロイ
5. タグ `vX.Y.(Z+1)` 付与

## 10. 推奨設定

### GitHub設定
- **Branch protection** → PR必須 + CI必須
- レビュー承認後のマージ許可

### 開発環境
- **Prettier + ESLint** でコード整形 & 品質担保
- **commitlint + Husky** でコミットチェック
- **Renovate**（月1回の依存関係更新） 