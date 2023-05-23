import './globals.css';
import { Nunito } from 'next/font/google';
import TopNav from '@/components/TopNav';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Contrast Parking',
  description: 'Park with a purpose.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {/* Include shared UI here, e.g., a header or sidebar */}
        <TopNav />
        <section className="m-6">{children}</section>
      </body>
    </html>
  );
};

export default RootLayout;
