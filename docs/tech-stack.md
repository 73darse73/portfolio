# 🛠️ 使用技術まとめ

## 🎨 フロントエンド

| 技術 | 採用理由 | 補足・代替案 |
| --- | --- | --- |
| **Next.js 14（App Router, TS）** | Next.jsを実務レベルで学びたい。ISR・画像最適化・Vercelとの親和性が高い。 | Nuxtでも可能だが、今回はReact資産を活かす方針。 |
| **Tailwind CSS** | 軽量でclass名設計不要。実装スピードが早い。 | CSS Modules / Vanilla Extract など。 |
| **shadcn/ui** | UI構築を短縮し、デザインに強くない部分を補完。 | MUI / Radix UIなども可。 |
| **Recharts（レーダー・棒・折れ線）** | JSXとの相性◎。必要十分な機能で軽量。 | Chart.jsは柔軟だがコード量が増えがち。 |
| **React Hook Form + Zod** | 軽量で高速、型安全なバリデーション。 | Formikは機能が厚くオーバーキル。 |
| **SWR + サーバ側fetch** | キャッシュ＋再検証が簡単。Nest APIとの相性◎。 | React Queryも可。 |
| **スパム対策（Honeypot＋軽Rate Limit）** | 公開フォームは高確率でスパムが来る。まずは低コスト対策から。 | CAPTCHAはUX低下するのでフェーズ2で。 |

---

## ⚙️ バックエンド

| 技術 | 採用理由 | 補足・代替案 |
| --- | --- | --- |
| **NestJS 10（REST）** | バックエンド設計を体系的に学ぶ。まずはRESTの基礎から。 | 必要に応じてGraphQLへ移行可。 |
| **PostgreSQL（Neon）** | AuthやStorage不要なので軽量なマネージドDBで十分。 | Supabaseは認証やStorage込み。 |
| **Prisma + 必要時のみ生SQL** | 型安全・スキーマ追従・可読性の高さ。生SQLは性能や特殊処理用。 | Drizzle ORMなども可。 |
| **取り込み（RSS Pull + GitHub Webhook）** | 記事は確実に取得、GitHubはリアルタイム化。 | 全ポーリングはレート制限や遅延あり。 |
| **ジョブ（Vercel Cron → Nest `/recalc`）** | 日次スコア確定で表示を軽量化。 | 重くなればBullMQ+Redisに移行。 |
| **送信（Resend + Slack Webhook）** | 問い合わせの見落とし防止と二重化。 | SMTP直送は管理負担あり。 |

---

## 🚀 インフラ / 運用

| 技術 | 採用理由 | 補足・代替案 |
| --- | --- | --- |
| **Front=Vercel / Back=Railway / DB=Neon** | NextはVercelが最短、Nestは常駐サーバ必須。 | Render / Fly.ioでも可。 |
| **監視：Vercel Analytics + Sentry** | 障害検知と可視化で信頼感UP。 | LogtailやAxiomでも可。 |
| **pnpm + Node 20 LTS** | 高速・安定・互換性広い。 | npm/Yarnでも動くがpnpm優勢。 |

---

## 📊 スコアリング設計

- **ルールJSON + 計算ライブラリ**
    - 配点・時系列減衰（半減期）をJSONで管理。
    - 計算ロジックは バックエンドに実装（Nest）
    - フロントは スナップショットを取得して表示（Recharts）
    - メリット：仕様変更が即反映可能、将来GoやPythonでも再利用可。
    - デメリット：生埋め込みより初期構築に時間がかかる。 