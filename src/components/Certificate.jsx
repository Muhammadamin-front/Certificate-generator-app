import { forwardRef, useEffect, useState } from 'react'
import QRCode from 'qrcode'

// Sertifikat asl rasmga mos — qora-oltin, A4 landshaft (1123 x 794 px).
const Certificate = forwardRef(function Certificate({ data }, ref) {
  const {
    fullName,
    course,
    profession,
    company,
    director,
    date,
    certNo,
  } = data

  const [qr, setQr] = useState('')

  useEffect(() => {
    const payload = `Z.X AURUM LOGISTIC | ${certNo} | ${fullName}`
    QRCode.toDataURL(payload, {
      margin: 0,
      width: 240,
      color: { dark: '#e9c66bff', light: '#00000000' },
      errorCorrectionLevel: 'M',
    })
      .then(setQr)
      .catch(() => setQr(''))
  }, [certNo, fullName])

  return (
    <div className="cert" ref={ref}>
      <div className="cert__frame">
        <span className="cert__corner cert__corner--tl" />
        <span className="cert__corner cert__corner--tr" />
        <span className="cert__corner cert__corner--bl" />
        <span className="cert__corner cert__corner--br" />

        <div className="cert__watermark cert__watermark--left">Z·X</div>
        <div className="cert__watermark cert__watermark--right">Z·X</div>

        <div className="cert__no">№ {certNo}</div>

        <div className="cert__body">
          <div className="cert__monogram">Z·X</div>
          <div className="cert__brand">Z.X&nbsp;AURUM</div>
          <div className="cert__brand-sub">— LOGISTIC —</div>

          <div className="cert__rule" />

          <h1 className="cert__title">SERTIFIKAT</h1>

          <p className="cert__lead">Mazkur sertifikat tasdiqlaydi, ki</p>
          <h2 className="cert__name">{fullName || 'ISM FAMILIYA'}</h2>

          <p className="cert__line">muvaffaqiyatli tugatdi kursni</p>
          <p className="cert__highlight">«{course}»</p>

          <p className="cert__line">kompaniyada</p>
          <p className="cert__company">{company}</p>

          <p className="cert__line">va o‘zlashtirdi kasbni</p>
          <p className="cert__highlight">«{profession}»</p>

          <p className="cert__desc">
            Mazkur kurs xalqaro logistika, tashish, rejalashtirish, yuk
            oqimlarini boshqarish va hamkorlar bilan muloqot sohasidagi nazariy
            va amaliy bilimlarni o‘z ichiga olgan.
          </p>
        </div>

        <div className="cert__footer">
          <div className="cert__foot cert__foot--left">
            <div className="cert__foot-label">BERILGAN SANA</div>
            <div className="cert__foot-rule" />
            <div className="cert__foot-value">{date}</div>
          </div>

          <div className="cert__foot cert__foot--center">
            <div className="cert__foot-rule" />
            <div className="cert__foot-label">DIREKTOR</div>
            <div className="cert__foot-value cert__foot-value--muted">
              {director}
            </div>
          </div>

          <div className="cert__foot cert__foot--right">
            <div className="cert__qr">
              {qr ? <img src={qr} alt="QR" /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Certificate
