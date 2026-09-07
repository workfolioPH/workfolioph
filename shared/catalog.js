/**
 * WorkFolio PH — canonical packages, add-ons, and price table.
 * The server is the only authority for money. The browser may estimate.
 */

export const CONTACT_METHODS = ['WhatsApp', 'Viber', 'Email', 'Phone'];

export const STATUSES = [
  'New',
  'Assets Received',
  'In Progress',
  'Reviewing',
  'Live',
  'Completed',
];

/** @type {Record<string, { name: string, price: number, quote?: boolean }>} */
export const PACKAGES = {
  starter: { name: 'Starter', price: 3500 },
  professional: { name: 'Professional', price: 6500 },
  premium: { name: 'Premium', price: 10500 },
  'business-web': { name: 'Business Web Build', price: 8500, quote: true },
};

/** @type {Record<string, { name: string, price: number }>} */
export const ADDONS = {
  'ats-cv': { name: 'ATS-Friendly CV Rewrite', price: 800 },
  'cover-letter': { name: 'Custom Cover Letter & Email Copy', price: 500 },
  'video-edit': { name: 'Professional Skill Video Editing (3 clips)', price: 2500 },
  'photo-grade': { name: 'Workplace Photo Enhancement (15 photos)', price: 1500 },
  'linkedin-opt': { name: 'LinkedIn Profile Optimization Guide', price: 500 },
  'annual-care': { name: '1-Year Annual Portfolio Maintenance', price: 1500 },
};

const PACKAGE_ALIASES = {
  starter: 'starter',
  'starter package': 'starter',
  professional: 'professional',
  'professional package': 'professional',
  premium: 'premium',
  'premium package': 'premium',
  'business-web': 'business-web',
  'business web': 'business-web',
  'business web build': 'business-web',
};

function addonLookup() {
  /** @type {Record<string, string>} */
  const map = {};
  for (const [id, addon] of Object.entries(ADDONS)) {
    map[id] = id;
    map[addon.name.toLowerCase()] = id;
  }
  return map;
}

const ADDON_ALIASES = addonLookup();

/**
 * Map a client package id or display name to a catalog id.
 * Empty input defaults to professional. Unknown input returns null (reject).
 * @param {unknown} raw
 * @returns {string | null}
 */
export function resolvePackageId(raw) {
  if (raw == null) return 'professional';
  const key = String(raw).trim().toLowerCase();
  if (!key) return 'professional';
  return PACKAGE_ALIASES[key] || null;
}

/**
 * Map client addon ids, names, or {id,name,price} objects to catalog ids.
 * Unknown entries return null (reject). Client prices are ignored.
 * @param {unknown} input
 * @returns {string[] | null}
 */
export function resolveAddonIds(input) {
  if (input == null || input === '') return [];
  if (!Array.isArray(input)) return null;
  const ids = [];
  for (const item of input) {
    let token = '';
    if (typeof item === 'string') token = item;
    else if (item && typeof item === 'object') token = item.id || item.name || '';
    else return null;
    const id = ADDON_ALIASES[String(token).trim().toLowerCase()];
    if (!id) return null;
    if (!ids.includes(id)) ids.push(id);
  }
  return ids;
}

/**
 * Server-side quote. Returns null if package or addon ids are invalid.
 * @param {string} packageId
 * @param {string[]} addonIds
 */
export function quoteFromSelection(packageId, addonIds) {
  const pkg = PACKAGES[packageId];
  if (!pkg) return null;
  const selected_addons = [];
  for (const id of addonIds) {
    const addon = ADDONS[id];
    if (!addon) return null;
    selected_addons.push({ id, name: addon.name, price: addon.price });
  }
  const total_price = pkg.price + selected_addons.reduce((sum, a) => sum + a.price, 0);
  return {
    package_id: packageId,
    package_name: pkg.name,
    selected_addons,
    total_price,
  };
}

export function publicCatalog() {
  return {
    packages: Object.entries(PACKAGES).map(([id, pkg]) => ({ id, ...pkg })),
    addons: Object.entries(ADDONS).map(([id, addon]) => ({ id, ...addon })),
    contact_methods: CONTACT_METHODS,
  };
}
