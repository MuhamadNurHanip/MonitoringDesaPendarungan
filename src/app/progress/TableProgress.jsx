"use client";
import Image from "next/image";
import Action from "./Action";
import { Process } from "@/components/Status";
import axios from "axios";
import { useEffect, useState } from "react";
import TableLoading from "@/components/TableLoading";
import { getYear } from "@/lib/getYear";

const TableProgress = () => {
  const [proker, setProker] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2023);

  const getProker = async () => {
    try {
      const data = (
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/proker`)
      ).data.data;
      setProker(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  let no = 1;

  useEffect(() => {
    getProker();
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="card space-y-2"
    >
      <div className="flex md:justify-end">
        <button className="button w-max" type="button">
          Export Data
        </button>
      </div>
      <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center">
        <label className="flex items-center gap-2" htmlFor="time">
          <span className="font-semibold">Waktu</span>
          <select
            onChange={(e) => {
              setYear(e.target.value);
            }}
            className="bg-primary-color text-second-color rounded-md outline-none text-xs p-2"
            name="time"
            id="time"
          >
            <option value="2021" selected={year == 2021}>
              2021
            </option>
            <option value="2022" selected={year == 2022}>
              2022
            </option>
            <option value="2023" selected={year == 2023}>
              2023
            </option>
          </select>
        </label>
        <label
          className="flex gap-3 w-max text-xs rounded-md p-2 border border-primary-color"
          htmlFor="search"
        >
          <Image width={24} height={24} alt="Search-icon" src={"/search.svg"} />
          <input
            className="bg-second-color outline-none"
            placeholder="Cari program kerja"
            type="text"
            name="search"
            id="search"
          />
        </label>
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
                if (
                  item.status == "Progress" &&
                  getYear(item.tanggal) == year
                ) {
                  return (
                    <tr key={index}>
                      <th>{no++}</th>
                      <td className="max-w-[180px]">{item.judul}</td>
                      <td>
                        <Process />
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
