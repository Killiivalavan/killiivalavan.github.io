import PageWrapper from "@/components/layout/PageWrapper";
import BucketListSection from "@/components/sections/BucketListSection";

export default function BucketListPage() {
  return (
    <PageWrapper scrollable={false}>
      <BucketListSection />
    </PageWrapper>
  );
}
