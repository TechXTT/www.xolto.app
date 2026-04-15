function normalizeURL(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

export const siteURL = normalizeURL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.xolto.app');
export const dashboardURL = normalizeURL(
  process.env.NEXT_PUBLIC_APP_URL || 'https://dash.xolto.app',
);
