import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'a.w interior design'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F4EFE8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        <div
          style={{
            color: '#2B2420',
            fontSize: 96,
            fontFamily: 'serif',
            letterSpacing: '0.06em',
            lineHeight: 1,
          }}
        >
          a.w
        </div>
        <div
          style={{
            color: '#2B2420',
            fontSize: 36,
            fontFamily: 'serif',
            letterSpacing: '0.14em',
            marginTop: 20,
          }}
        >
          interior design
        </div>
        <div
          style={{
            color: '#6E6358',
            fontSize: 26,
            fontFamily: 'serif',
            letterSpacing: '0.06em',
            marginTop: 14,
          }}
        >
          עיצוב פנים למגורים
        </div>
      </div>
    ),
    { ...size },
  )
}
