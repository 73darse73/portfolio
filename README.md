# 🚀 Portfolio Site

転職活動・副業案件獲得のためのポートフォリオサイト

## 📖 概要

このプロジェクトは、Next.js 14 + NestJS 10のフルスタック構成で構築されたポートフォリオサイトです。

### 🎯 目的
- 転職活動での自己アピール
- 副業案件の獲得
- 自分の活動や考えを知ってもらう
- アウトプット習慣の定着

### 🛠️ 技術スタック
- **フロントエンド**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **バックエンド**: NestJS 10, Prisma, PostgreSQL
- **インフラ**: Vercel, Railway, Neon
- **開発環境**: pnpm, ESLint, Prettier, Husky

## 🚀 クイックスタート

### 前提条件
- Node.js 20以上
- pnpm 9以上
- Git

### セットアップ
```bash
# リポジトリクローン
git clone <repository-url>
cd portfolio

# 依存関係インストール
pnpm install

# 開発環境起動
pnpm dev
```

### 開発コマンド
```bash
pnpm dev          # フロント・バック同時起動
pnpm build        # 両方ビルド
pnpm lint         # 両方のlint
pnpm typecheck    # 両方の型チェック
pnpm check        # lint + typecheck + build
```

## 📚 ドキュメント

詳細な情報は以下のドキュメントを参照してください：

- 📋 [要件定義](./docs/requirements.md) - プロジェクトの目的・ユーザー・ページ構成
- 🛠️ [技術スタック](./docs/tech-stack.md) - 使用技術と採用理由
- 📁 [アーキテクチャ](./docs/architecture.md) - ディレクトリ構成と技術設計
- 🔧 [Git管理](./docs/git-workflow.md) - ブランチ運用・コミット・PRルール
- 🚀 [開発環境](./docs/development.md) - セットアップ・運用フロー・トラブルシューティング

## 🏗️ プロジェクト構造

```
root/
├─ frontend/      # Next.js 14（App Router, TS）
├─ backend/       # NestJS 10（REST, DTOはサーバ内完結）
├─ docs/          # プロジェクトドキュメント
├─ package.json   # 同時起動などのオーケストレーションのみ
└─ pnpm-workspace.yaml
```

## 🔄 開発フロー

### 通常開発（ブランチベース、PRなし）
1. **ブランチ作成**: `git switch -c feat/feature-name`
2. **実装・テスト**: 機能開発とテスト
3. **品質チェック**: `pnpm run check`
4. **mainブランチにマージ**: `git merge feat/feature-name`
5. **プッシュ・デプロイ**: `git push origin main`
6. **ブランチ削除**: `git branch -d feat/feature-name`

### 緊急修正（ホットフィックス）
1. **ホットフィックスブランチ作成**: `git switch -c hotfix/critical-issue`
2. **最小修正**: 緊急対応
3. **品質チェック**: `pnpm run check`
4. **マージ・プッシュ・デプロイ**: 即座に反映
5. **ブランチ削除**: `git branch -d hotfix/critical-issue`

## 📝 ライセンス

このプロジェクトは個人のポートフォリオ用です。

## 🤝 お問い合わせ

ご質問やご提案がございましたら、お気軽にお声がけください。