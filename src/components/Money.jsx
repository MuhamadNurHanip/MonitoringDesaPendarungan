import Image from "next/image";

const Money = () => {
  return (
    <section data-aos="fade-down-right" className="w-full">
      <h1 className="font-extrabold text-xl mb-3">Dana Desa Pendarungan</h1>
      <div className="space-y-2">
        <div className="flex items-center gap-3 shadow-custom p-2 rounded-md">
          <Image
            alt="icon-money"
            className="row-span-2"
            width={35}
            height={35}
            src={"/jumlah.svg"}
          />
          <div>
            <p className="text-xs">Jumlah Dana</p>
            <p className="font-bold">Rp. 17.000.000</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shadow-custom p-2 rounded-md">
          <Image
            alt="icon-money"
            className="row-span-2"
            width={35}
            height={35}
            src={"/realisasi.svg"}
          />
          <div>
            <p className="text-xs">Realisasi Dana</p>
            <p className="font-bold">Rp. 17.000.000</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shadow-custom p-2 rounded-md">
          <Image
            alt="icon-money"
            className="row-span-2 ml-2"
            width={25}
            height={25}
            src={"/sumber.svg"}
          />
          <div>
            <p className="text-xs">Sumber Dana</p>
            <p className="font-bold">12</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Money;
