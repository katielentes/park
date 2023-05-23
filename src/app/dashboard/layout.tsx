import { FacilityProvider } from '../../context/FacilityContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FacilityProvider>
      <section>{children}</section>
    </FacilityProvider>
  );
}
