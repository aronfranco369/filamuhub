import ContentDetails from "@/app/components/ContentDetails/ContentDetails";

export default async function Page({ params }) {
  const awaitedParams = await params;
  return <ContentDetails name={awaitedParams.name} />;
}
