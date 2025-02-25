import CountryContentSection from "@/app/components/CountrySection";

export default async function Page({ params }) {
  const awaitedParams = await params;
  return <CountryContentSection type={awaitedParams.category} />;
}
