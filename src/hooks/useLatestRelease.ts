import { useEffect, useState } from 'react'

export const GITHUB_REPO = '625673575/JuicyPlayer.github.io'
export const RELEASES_PAGE_URL = `https://github.com/${GITHUB_REPO}/releases/latest`
const LATEST_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`

export interface ReleaseAsset {
  name: string
  size: number
  browser_download_url: string
}

export interface LatestRelease {
  /** 版本号，不含前导 v，如 "1.3.22" */
  version: string
  x64?: ReleaseAsset
  arm64?: ReleaseAsset
}

interface GithubReleaseJson {
  tag_name?: string
  assets?: { name?: string; size?: number; browser_download_url?: string }[]
}

function parseRelease(json: GithubReleaseJson): LatestRelease | null {
  const assets = Array.isArray(json.assets) ? json.assets : []
  let x64: ReleaseAsset | undefined
  let arm64: ReleaseAsset | undefined
  for (const a of assets) {
    if (!a.name || !a.browser_download_url || !/\.exe$/i.test(a.name)) continue
    const asset: ReleaseAsset = {
      name: a.name,
      size: typeof a.size === 'number' ? a.size : 0,
      browser_download_url: a.browser_download_url,
    }
    if (/arm64/i.test(a.name)) arm64 = asset
    else if (/x64/i.test(a.name)) x64 = asset
  }
  if (!x64 && !arm64) return null
  return { version: (json.tag_name ?? '').replace(/^v/, ''), x64, arm64 }
}

// 模块级缓存：多个组件共享同一次请求，StrictMode 双挂载也只发一次
let cache: LatestRelease | null | undefined
let inflight: Promise<LatestRelease | null> | null = null

function fetchLatest(): Promise<LatestRelease | null> {
  if (!inflight) {
    inflight = fetch(LATEST_API_URL, { headers: { Accept: 'application/vnd.github+json' } })
      .then(async (res) => (res.ok ? parseRelease(await res.json()) : null))
      .catch(() => null)
      .then((r) => {
        cache = r
        return r
      })
  }
  return inflight
}

/** 拉取 GitHub 最新 Release；还没有 Release 或接口失败时返回 null，调用方回退到 RELEASES_PAGE_URL */
export function useLatestRelease(): LatestRelease | null {
  const [release, setRelease] = useState<LatestRelease | null>(cache ?? null)

  useEffect(() => {
    if (cache !== undefined) {
      setRelease(cache)
      return
    }
    let cancelled = false
    fetchLatest().then((r) => {
      if (!cancelled) setRelease(r)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return release
}

export function formatMB(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))} MB`
}
