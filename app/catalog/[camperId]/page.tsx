import CamperDetailsClient from "@/components/CamperDetailsClient/CamperDetailsClient";
import css from "./CamperPage.module.css";

interface CamperPageProps {
  params: Promise<{
    camperId: string;
  }>;
}

export default async function CamperPage({ params }: CamperPageProps) {
  const { camperId } = await params;
  return (
    <section className={css.page}>
      <div className="container">
        <CamperDetailsClient camperId={camperId} />
      </div>
    </section>
  );
}
