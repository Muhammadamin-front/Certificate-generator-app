import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

// Yuqori sifatli PNG olish uchun real o'lchamda (1123x794) render qilamiz.
const PIXEL_RATIO = 3

async function renderPng(node) {
  // Shriftlar to'liq yuklanishini kutamiz — aks holda eksportda noto'g'ri chiqadi.
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready
  }
  return toPng(node, {
    pixelRatio: PIXEL_RATIO,
    cacheBust: true,
    backgroundColor: '#0a0a0d',
    width: node.offsetWidth,
    height: node.offsetHeight,
  })
}

function triggerDownload(dataUrl, filename) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export async function exportPng(node, filename) {
  const dataUrl = await renderPng(node)
  triggerDownload(dataUrl, `${filename}.png`)
}

export async function exportPdf(node, filename) {
  const dataUrl = await renderPng(node)

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  pdf.addImage(dataUrl, 'PNG', 0, 0, pageW, pageH, undefined, 'FAST')
  pdf.save(`${filename}.pdf`)
}
