# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9 (root), 5.7.3 (next-app)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/next-app run dev` — run Next.js app locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Next.js App (`artifacts/next-app`)
- **Preview path**: `/`
- **Port**: 3000
- **Framework**: Next.js 15.3.2 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui (new-york style, neutral base)
- **Key deps**: React 19, next-themes, react-hook-form, zod, recharts, lucide-react
- **Config files**: `next.config.mjs`, `postcss.config.mjs`, `components.json`, `tsconfig.json`
- **Workflow**: `Next.js App` — `pnpm --filter @workspace/next-app run dev`

### API Server (`artifacts/api-server`)
- **Preview path**: `/api`
- **Port**: 8080
- **Framework**: Express 5

### Canvas (`artifacts/mockup-sandbox`)
- **Preview path**: `/__mockup`
- Design/mockup sandbox
