# GitHub Repository Search

GitHub 上の公開リポジトリをキーワードで検索できる Web アプリケーションです。検索結果の並び替え、ページネーション、表示件数の変更に対応しています。

## Features

- キーワードによる公開リポジトリ検索
- 検索結果のページネーション
- 並び替え
  - スター数
  - フォーク数
  - 最終更新日時
- 1 ページあたりの表示件数変更
- 検索条件・ページごとの結果キャッシュ
- GitHub Search API の取得上限（1,000 件）の明示
- 不完全な検索結果に対する警告表示

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- CSS Modules
- Biome
- Vitest
- React Testing Library
- GitHub REST API

## Setup

### Requirements

- Node.js
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

開発サーバーの URL は、コマンド実行時に Vite が表示します。

### Other commands

```bash
# Production build
pnpm build

# Preview the production build
pnpm preview

# Lint and format check
pnpm check

# Apply formatting
pnpm format

# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Generate a coverage report
pnpm test:coverage
```

### Testing

Vitest と React Testing Library を使用して、API リクエスト、フォーム操作、ページネーション、および検索画面の主要な状態をテストしています。カバレッジレポートは `coverage/` に生成されます（Git 管理対象外）。

## API

[GitHub REST API の Search repositories エンドポイント](https://docs.github.com/rest/search/search#search-repositories)を使用しています。

```http
GET /search/repositories
```

このアプリケーションは認証なしで GitHub API を呼び出します。そのため、API のレート制限に達した場合は検索に失敗することがあります。

Search API は 1 クエリにつき最大 1,000 件まで取得できます。該当件数が上限を超える場合、アプリケーションはページネーションを 1,000 件までに制限します。

## Implementation notes

### Data fetching

API 通信にはブラウザ標準の Fetch API を使用しています。利用する API が限定的であり、共通の認証処理や interceptor を必要としないため、HTTP クライアントライブラリは追加していません。

### Server state

サーバー状態の管理には TanStack Query を使用しています。検索条件とページごとに結果をキャッシュし、5 分間は同じ条件での不要な API リクエストを抑えます。ページ切り替え中は直前の結果を表示します。

### Styling

スタイリングには CSS Modules を使用しています。コンポーネント単位でスタイルのスコープを分離しつつ、小規模なアプリケーションのため CSS フレームワークは使用していません。

### API response

GitHub API のレスポンスは snake_case ですが、API 層でアプリケーション内部の camelCase のデータ構造へ変換しています。これにより、外部 API 固有のデータ形式を UI 層に持ち込まないようにしています。
