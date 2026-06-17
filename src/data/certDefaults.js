import { randomCertNo, todayStr } from '../utils/format.js'

// Sertifikatning dizayn o'lchami (A4 landshaft, 96dpi).
export const CERT_W = 1123
export const CERT_H = 794

export function defaultCertData() {
  return {
    fullName: 'Abdullayev Abdulloh',
    course: 'Xalqaro logistika',
    profession: 'Dispetcher',
    company: 'Z.X AURUM Logistic',
    director: 'Z.X AURUM Logistic',
    date: todayStr(),
    certNo: randomCertNo(),
  }
}
