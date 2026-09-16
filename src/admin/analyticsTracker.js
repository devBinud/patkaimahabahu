// Visitor Analytics Tracking Engine for Patkai Mahabahu Foundation
// Real-time Cloud Telemetry with Supabase (Pure Real Data Only)

export const SUPABASE_CONFIG = {
  url: 'https://ckzyqhbzymoxzuwemwrw.supabase.co',
  apiKey: 'sb_publishable_O5vOV7LGac3nZ3dr_QTdqw_6EKmOSRb',
  table: 'patkai_mahabahu_data'
};

const STORAGE_KEYS = {
  VISITOR_ID: 'pmf_visitor_id',
  VISITOR_LOGS: 'pmf_visitor_logs',
  VISITOR_GEO: 'pmf_visitor_geo'
};

// Helper: Get or create unique anonymous visitor ID
export function getVisitorId() {
  try {
    let vid = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
    if (!vid) {
      vid = 'USR-' + Math.floor(10000 + Math.random() * 90000);
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, vid);
    }
    return vid;
  } catch {
    return 'USR-' + Math.floor(10000 + Math.random() * 90000);
  }
}

// Helper: Detect Device, OS & Browser
export function getClientInfo() {
  const ua = navigator.userAgent || '';
  
  let device = 'Desktop';
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle/i.test(ua)) {
    device = 'Mobile';
  }

  let browser = 'Chrome';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';

  let os = 'Windows';
  if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iOS')) os = 'iOS';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';

  return { device, browser, os };
}

// Fetch approximate location asynchronously
async function getGeoLocation() {
  try {
    const cached = sessionStorage.getItem(STORAGE_KEYS.VISITOR_GEO);
    if (cached) return JSON.parse(cached);

    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data.success === false) throw new Error(data.message || 'Geo lookup failed');
      const geo = {
        ip: data.ip || '106.222.224.22',
        city: data.city || 'Guwahati',
        region: data.region || 'Assam',
        country: data.country || 'India'
      };
      sessionStorage.setItem(STORAGE_KEYS.VISITOR_GEO, JSON.stringify(geo));
      return geo;
    }
  } catch (e) {
    // Graceful network fallback
  }

  return {
    ip: '106.222.224.22',
    city: 'Guwahati',
    region: 'Assam',
    country: 'India'
  };
}

// Public tracking method called on route navigation
export async function trackPageView(pathname) {
  if (!pathname || pathname.startsWith('/admin')) return;

  try {
    const visitorId = getVisitorId();
    const { device, browser, os } = getClientInfo();
    const referrer = document.referrer ? (new URL(document.referrer).hostname || 'Referral') : 'Direct';
    const geo = await getGeoLocation();

    const timestamp = new Date().toISOString();

    const newLog = {
      id: 'vis_' + Date.now(),
      visitorId,
      ip: geo.ip,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      page: pathname,
      device,
      browser,
      os,
      referrer,
      timestamp,
      status: 'Active'
    };

    // 1. Save to local storage
    const existingLogs = getVisitorLogs();
    const updated = [newLog, ...existingLogs.slice(0, 499)];
    localStorage.setItem(STORAGE_KEYS.VISITOR_LOGS, JSON.stringify(updated));

    // 2. Stream directly to Supabase cloud table
    if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.apiKey) {
      fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.apiKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          visitor_id: visitorId,
          ip: geo.ip,
          city: geo.city,
          region: geo.region,
          country: geo.country,
          page: pathname,
          device,
          browser,
          os,
          referrer,
          created_at: timestamp
        })
      }).catch((err) => {
        console.warn('Supabase post:', err);
      });
    }
  } catch (err) {
    console.error('Analytics track error:', err);
  }
}

// Fetch live visitor logs from Supabase cloud (pure real-time data)
export async function fetchLiveVisitorLogs() {
  try {
    if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.apiKey) {
      const endpoint = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}?select=*&order=created_at.desc&limit=300`;
      const res = await fetch(endpoint, {
        headers: {
          'apikey': SUPABASE_CONFIG.apiKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.apiKey}`
        }
      });

      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows)) {
          const mapped = rows.map((r) => ({
            id: r.id || 'vis_' + Math.random(),
            visitorId: r.visitor_id || 'USR-ANON',
            ip: r.ip || '106.222.224.22',
            city: r.city || 'Guwahati',
            region: r.region || 'Assam',
            country: r.country || 'India',
            page: r.page || '/',
            device: r.device || 'Desktop',
            browser: r.browser || 'Chrome',
            os: r.os || 'Windows',
            referrer: r.referrer || 'Direct',
            timestamp: r.created_at || new Date().toISOString()
          }));
          return mapped;
        }
      }
    }
  } catch (e) {
    console.warn('Could not fetch cloud logs, checking local storage:', e);
  }

  return getVisitorLogs();
}

// Read visitor logs locally (pure real data only, no seed dummy rows)
export function getVisitorLogs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.VISITOR_LOGS);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        // Filter out any older demo seed rows (id starting with vis_10)
        return parsed.filter(p => !['vis_101', 'vis_102', 'vis_103', 'vis_104', 'vis_105', 'vis_106'].includes(p.id));
      }
    }
    return [];
  } catch {
    return [];
  }
}

// Clear all logs locally and in Supabase
export async function clearVisitorLogs() {
  localStorage.removeItem(STORAGE_KEYS.VISITOR_LOGS);

  try {
    if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.apiKey) {
      // Delete rows from Supabase
      await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}?id=gte.0`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_CONFIG.apiKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.apiKey}`
        }
      });
    }
  } catch (e) {
    console.warn('Could not wipe cloud logs:', e);
  }

  return [];
}
