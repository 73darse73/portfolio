# 📁 アーキテクチャ

## ディレクトリ構成

### 設計方針
- 1つのコマンドで2つのディレクトリを立ち上げたい
- フロントエンドとバックエンドは完全に分離

### 構成
```bash
root/
├─ frontend/      # Next.js 14（App Router, TS）
├─ backend/       # NestJS 10（REST, DTOはサーバ内完結）
├─ docs/          # プロジェクトドキュメント
├─ package.json   # 同時起動などのオーケストレーションのみ
└─ pnpm-workspace.yaml
```

## 技術アーキテクチャ

### フロントエンド（Next.js 14）
- **App Router**: ファイルベースルーティング
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: ユーティリティファーストCSS
- **shadcn/ui**: 再利用可能なUIコンポーネント
- **SWR**: データフェッチングとキャッシュ

### バックエンド（NestJS 10）
- **REST API**: シンプルなHTTP通信
- **Prisma**: 型安全なデータベース操作
- **PostgreSQL**: リレーショナルデータベース
- **JWT**: 認証・認可

### インフラ構成
- **フロントエンド**: Vercel（静的サイトホスティング）
- **バックエンド**: Railway/Render（常駐サーバー）
- **データベース**: Neon（PostgreSQL as a Service）
- **監視**: Vercel Analytics + Sentry

## データフロー

```
フロントエンド ←→ バックエンド ←→ データベース
     ↓              ↓
   Vercel        Railway
```

## セキュリティ設計

- **環境変数**: Git管理外、Vercel/Railwayで管理
- **CORS**: フロントエンドドメインからのみアクセス許可
- **レート制限**: APIエンドポイントの過負荷防止
- **バリデーション**: フロント・バック両方で入力検証 