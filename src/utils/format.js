// Sana, sertifikat raqami va fayl nomi uchun yordamchi funksiyalar.

export function todayStr() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`
}

export function randomCertNo() {
  const n = Math.floor(1000 + Math.random() * 9000)
  return `ZXAL-${new Date().getFullYear()}-${n}`
}

// "DD.MM.YYYY" -> "YYYY-MM-DD" (date input uchun)
export function displayToIso(display) {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec((display || '').trim())
  if (!m) return ''
  const [, dd, mm, yyyy] = m
  return `${yyyy}-${mm}-${dd}`
}

// "YYYY-MM-DD" -> "DD.MM.YYYY" (sertifikatda ko'rsatish uchun)
export function isoToDisplay(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((iso || '').trim())
  if (!m) return ''
  const [, yyyy, mm, dd] = m
  return `${dd}.${mm}.${yyyy}`
}

export function buildFileName(fullName) {
  const safe = (fullName || 'sertifikat')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\p{L}\p{N}_-]/gu, '')
  return `Sertifikat_${safe || 'ZX'}`
}
