'use client';

import { useEffect, useState } from 'react';

/**
 * Device Detection and Redirect Script
 * 
 * This page detects the user's device/OS and redirects to the appropriate
 * app store or fallback URL. It uses user agent detection which is reliable
 * for mobile device identification.
 */

// ============================================================================
// CONFIGURATION - App Store URLs
// ============================================================================

const APP_STORE_URL = 'https://apps.apple.com/ch/app/sporty-by-quantifai/id6749280226';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.quantifai.sporty';
const FALLBACK_URL = 'https://www.qwantifai.com/';

// ============================================================================
// Device Detection Functions
// ============================================================================

/**
 * Detects if the device is running iOS
 * Checks for iOS-specific user agent strings and platform indicators
 */
function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  const platform = navigator.platform || '';
  
  // Check for iOS devices (iPhone, iPad, iPod)
  const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
  
  // Modern iOS devices (iOS 13+) report as "MacIntel" but have touch support
  const isIOSSimulator = /Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1;
  
  // Additional check for iPad on iOS 13+
  const isIPad = platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  
  return isIOSDevice || isIOSSimulator || isIPad;
}

/**
 * Detects if the device is running Android
 * Checks for Android-specific user agent strings
 */
function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  
  // Check for Android devices
  // Exclude Chrome OS which also contains "Android" in user agent
  const isAndroidDevice = /Android/.test(userAgent) && !/Chrome OS/.test(userAgent);
  
  // Additional check: Android devices typically have "Mobile" in user agent
  // but some tablets might not
  return isAndroidDevice;
}

/**
 * Determines the target URL based on device detection
 * @returns {string} The URL to redirect to
 */
function getTargetURL(): string {
  if (isIOS()) {
    return APP_STORE_URL;
  } else if (isAndroid()) {
    return PLAY_STORE_URL;
  } else {
    // Desktop, tablet, or unsupported device
    return FALLBACK_URL;
  }
}

/**
 * Gets a user-friendly message based on the detected device
 * @returns {string} Message to display to the user
 */
function getRedirectMessage(): string {
  if (isIOS()) {
    return 'Redirecting to the Apple App Store...';
  } else if (isAndroid()) {
    return 'Redirecting to the Google Play Store...';
  } else {
    return 'Redirecting to our website...';
  }
}

export default function InstallPage() {
  const [message, setMessage] = useState('Taking you to the app store...');
  const [targetURL, setTargetURL] = useState<string | null>(null);
  const [showManualLink, setShowManualLink] = useState(false);

  useEffect(() => {
    // Update message immediately
    const redirectMessage = getRedirectMessage();
    setMessage(redirectMessage);
    const url = getTargetURL();
    setTargetURL(url);
    setShowManualLink(true); // Show link immediately

    // Perform redirect IMMEDIATELY - no delay
    // This is critical for mobile devices
    if (url && typeof window !== 'undefined') {
      // Multiple redirect attempts to ensure it works
      const performRedirect = () => {
        try {
          window.location.replace(url);
        } catch (e) {
          window.location.href = url;
        }
      };

      // Immediate redirect - use microtask to ensure it runs asap
      Promise.resolve().then(() => {
        performRedirect();
      });

      // Also try immediately (synchronous)
      performRedirect();

      // Fallback: If still on page after 100ms, try again
      const fallbackTimer = setTimeout(() => {
        if (window.location.pathname.includes('/sporty/install')) {
          performRedirect();
        }
      }, 100);

      // Another fallback after 500ms
      const fallbackTimer2 = setTimeout(() => {
        if (window.location.pathname.includes('/sporty/install')) {
          performRedirect();
        }
      }, 500);

      // Final fallback after 1 second
      const finalTimer = setTimeout(() => {
        if (window.location.pathname.includes('/sporty/install')) {
          window.location.href = url;
        }
      }, 1000);

      return () => {
        clearTimeout(fallbackTimer);
        clearTimeout(fallbackTimer2);
        clearTimeout(finalTimer);
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-5 bg-gradient-to-br from-cyan-500 to-cyan-700 text-white text-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 max-w-md w-full">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-5"></div>
        <h1 className="text-2xl font-semibold mb-2.5">Redirecting...</h1>
        <p className="mb-5 opacity-90 leading-relaxed">{message}</p>
        {targetURL && (
          <a
            href={targetURL}
            className="inline-block bg-white text-cyan-600 border-none px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline mt-4"
            onClick={(e) => {
              e.preventDefault();
              if (targetURL) {
                window.location.href = targetURL;
              }
            }}
          >
            {isIOS() ? 'Open App Store' : isAndroid() ? 'Open Play Store' : 'Continue to Website'}
          </a>
        )}
      </div>
    </div>
  );
}

