import { PublicPageLayout } from "@/shared/layout/public-page-layout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicPageLayout>{children}</PublicPageLayout>;
}
