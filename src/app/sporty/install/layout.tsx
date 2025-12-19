import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Sporty App',
  description: 'Download the Sporty app from the App Store or Google Play',
  robots: 'noindex, nofollow',
};

export default function InstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

