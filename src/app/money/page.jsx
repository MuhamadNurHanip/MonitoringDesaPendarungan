import Header from "@/components/Header";
import Money from "@/components/Money";
import SumberDana from "./SumberDana";

const MoneyPage = () => {
  return (
    <main>
      <Header page={"Keuangan Desa"} />
      <div className="space-y-3 md:flex gap-3">
        <Money />
        <SumberDana />
      </div>
    </main>
  );
};

export default MoneyPage;
