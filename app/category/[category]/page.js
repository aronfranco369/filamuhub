import CountryContentSection from "@/app/components/CountrySection";

export default function Page({ params }) {
  console.log("Category param:", params.category); // Add this for debugging
  return <CountryContentSection type={params.category} />;
}
