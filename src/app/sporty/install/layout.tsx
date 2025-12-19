import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Download Sporty App',
  description: 'Download the Sporty app from the App Store or Google Play',
  robots: 'noindex, nofollow',
};

// App Store URLs
const APP_STORE_URL = 'https://apps.apple.com/ch/app/sporty-by-quantifai/id6749280226';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.quantifai.sporty';
const FALLBACK_URL = 'https://www.qwantifai.com/';

export default function InstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="install-redirect"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function isIOS() {
                const ua = navigator.userAgent || navigator.vendor || window.opera || '';
                const isIOSDevice = /iPad|iPhone|iPod/.test(ua);
                const isIOSSimulator = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
                const isIPad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
                return isIOSDevice || isIOSSimulator || isIPad;
              }
              
              function isAndroid() {
                const ua = navigator.userAgent || navigator.vendor || window.opera || '';
                return /Android/.test(ua) && !/Chrome OS/.test(ua);
              }
              
              function getTargetURL() {
                if (isIOS()) {
                  return '${APP_STORE_URL}';
                } else if (isAndroid()) {
                  return '${PLAY_STORE_URL}';
                } else {
                  return '${FALLBACK_URL}';
                }
              }
              
              const targetURL = getTargetURL();
              if (targetURL && window.location.pathname.includes('/sporty/install')) {
                try {
                  window.location.replace(targetURL);
                } catch (e) {
                  window.location.href = targetURL;
                }
              }
            })();
          `,
        }}
      />
      {children}
    </>
  );
}

