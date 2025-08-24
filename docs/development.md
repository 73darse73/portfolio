# 🚀 開発環境

## セットアップ

### 前提条件
- Node.js 20以上
- pnpm 9以上
- Git

### 初期セットアップ
```bash
# リポジトリクローン
git clone <repository-url>
cd portfolio

# 依存関係インストール
pnpm install

# 開発環境起動
pnpm dev
```

## 運用フロー（チェックリスト）

### 通常開発フロー
```bash
# 1. ブランチ作成
git switch -c feat/home_fv_add-motion

# 2. 実装・テスト
# ... 実装作業 ...

# 3. 品質チェック
pnpm run check

# 4. PR作成
# - スクリーンショット添付
# - テンプレート記入

# 5. CI通過確認
# - Lint・Build・TypeCheck

# 6. Preview確認
# - OKなら Squash & Merge

# 7. 本番昇格
# - 手動デプロイ
# - 必要に応じてタグ付与
```

### 緊急修正フロー
```bash
# 1. ホットフィックスブランチ
git switch -c hotfix/critical-issue

# 2. 最小修正
# 3. 即座にマージ・デプロイ
# 4. タグ付与
```

## 開発コマンド

### ルートレベル
```bash
pnpm dev          # フロント・バック同時起動
pnpm build        # 両方ビルド
pnpm start        # 本番起動（バックエンド）
pnpm lint         # 両方のlint
pnpm typecheck    # 両方の型チェック
pnpm format       # 両方のフォーマット
pnpm check        # lint + typecheck + build
```

### フロントエンド
```bash
pnpm -C frontend dev      # 開発サーバー起動
pnpm -C frontend build    # ビルド
pnpm -C frontend lint     # ESLint実行
pnpm -C frontend start    # 本番起動
```

### バックエンド
```bash
pnpm -C backend start:dev # 開発サーバー起動
pnpm -C backend build     # ビルド
pnpm -C backend lint      # ESLint実行
pnpm -C backend start     # 本番起動
```

## 環境変数

### フロントエンド（.env.local）
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GA_ID=your-ga-id
```

### バックエンド（.env）
```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="your-jwt-secret"
RESEND_API_KEY="your-resend-key"
SLACK_WEBHOOK_URL="your-slack-webhook"
```

### 環境変数テンプレート
- `env.example`ファイルを更新
- 実際の値はGit管理外
- Vercel/Railwayで本番環境変数を管理

## データベース

### ローカル開発
```bash
# Prisma Studio起動
pnpm -C backend prisma studio

# マイグレーション実行
pnpm -C backend prisma migrate dev

# シード実行
pnpm -C backend prisma db seed
```

### 本番環境
```bash
# マイグレーション適用
pnpm -C backend prisma migrate deploy

# バックアップ（重要）
# 破壊的変更前は必ず実行
```

## デバッグ・テスト

### フロントエンド
- Next.js DevTools
- React Developer Tools
- Tailwind CSS IntelliSense

### バックエンド
- NestJS Logger
- Prisma Studio
- Postman/Insomnia

### テスト実行
```bash
# フロントエンド
pnpm -C frontend test

# バックエンド
pnpm -C backend test
```

## トラブルシューティング

### よくある問題
1. **ポート競合**: 3000番（フロント）と3001番（バック）が使用中
2. **依存関係エラー**: `pnpm install`を再実行
3. **環境変数未設定**: `.env.example`を参考に`.env`ファイル作成
4. **データベース接続エラー**: Neonの接続文字列を確認

### ログ確認
- フロントエンド: ブラウザのコンソール
- バックエンド: ターミナル出力
- 本番環境: Vercel/Railwayのログ 