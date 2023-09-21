"use client";
import Image from "next/image";
import Action from "./Action";
import { Finish, Process, Rencana } from "@/components/Status";
import axios from "axios";
import { useEffect, useState } from "react";
import TableLoading from "@/components/TableLoading";
import { getYear } from "@/lib/getYear";
import SetProgress from "./SetProgress";
import Search from "@/components/Search";

const TableProgress = () => {
  const [proker, setProker] = useState([]);
  const [oldProker, setOldProker] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState();

  const getProker = async () => {
    try {
      const data = (
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/proker`)
      ).data.data;
      setProker(data);
      setOldProker(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const currentThisYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear;
  };

  const searchItem = (query) => {
    if (query.trim() === "") {
      setProker(oldProker);
    } else {
      const results = proker.filter((item) =>
        item.judul.toLowerCase().includes(query.toLowerCase())
      );
      setProker(results);
    }
  };

  let no = 1;
  const items = [];

  for (let i = 2010; i <= currentThisYear(); i++) {
    items.push(
      <option key={i} value={i} selected={year == i}>
        {i}
      </option>
    );
  }

  useEffect(() => {
    getProker();
    setYear(currentThisYear());
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="card space-y-2"
    >
      <SetProgress getProker={getProker} option={proker} />
      <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center">
        <label className="flex items-center gap-2" htmlFor="time">
          <span className="font-semibold">Tahun</span>
          <select
            onChange={(e) => {
              setYear(e.target.value);
            }}
            defaultValue={year}
            className="bg-primary-color text-second-color rounded-md outline-none text-xs p-2"
            name="time"
            id="time"
          >
            {items}
          </select>
        </label>
        <Search search={searchItem} />
      </div>
      <div className="overflow-x-auto rounded-t-md">
        {loading ? (
          <TableLoading />
        ) : (
          <table className="table">
            <thead>
              <tr className="bg-primary-color/20 text-primary-color">
                <th>No</th>
                <th>Nama</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {proker.map((item, index) => {
                if (getYear(item.tanggal) == year) {
                  return (
                    <tr key={index}>
                      <th>{no++}</th>
                      <td className="max-w-[180px]">{item.judul}</td>
                      <td>
                        {item.status == "Rencana" && <Rencana />}
                        {item.status == "Progress" && <Process />}
                        {item.status == "Selesai" && <Finish />}
                      </td>
                      <td>
                        <Action item={item} key={index} />
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        )}
        {no == 1 && !loading ? (
          <h1 className="text-center font-bold my-3">Tidak ada data!</h1>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default TableProgress;
