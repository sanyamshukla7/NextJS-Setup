/**
 * Writes NEXT_PUBLIC_* vars from process.env into .env.local
 * so Next.js can substitute them into the client bundle at startup.
 * Runs automatically before `next dev` / `next build`.
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!url || !key) {
  console.warn('[setup-env] WARNING: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.')
} else {
  const content = `NEXT_PUBLIC_SUPABASE_URL=${url}\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${key}\n`
  writeFileSync(join(root, '.env.local'), content, 'utf8')
  console.log('[setup-env] .env.local written successfully.')
}
