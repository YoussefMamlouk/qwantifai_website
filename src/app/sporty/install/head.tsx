export default function Head() {
  // Putting the redirect script in <head> ensures it runs as early as possible,
  // before React hydration and before most assets load.
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function isIOS() {
                var ua = navigator.userAgent || navigator.vendor || window.opera || '';
                var isIOSDevice = /iPad|iPhone|iPod/.test(ua);
                var isIOSSimulator = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
                var isIPad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
                return isIOSDevice || isIOSSimulator || isIPad;
              }

              function isAndroid() {
                var ua = navigator.userAgent || navigator.vendor || window.opera || '';
                return /Android/.test(ua) && !/Chrome OS/.test(ua);
              }

              var targetURL = isIOS()
                ? 'https://apps.apple.com/ch/app/sporty-by-quantifai/id6749280226'
                : isAndroid()
                  ? 'https://play.google.com/store/apps/details?id=com.quantifai.sporty'
                  : 'https://www.qwantifai.com/';

              try {
                window.location.replace(targetURL);
              } catch (e) {
                window.location.href = targetURL;
              }
            })();
          `,
        }}
      />
    </>
  );
}


