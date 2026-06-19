import { useEffect, useState } from "react";
import type { Dataset } from "../types/dataset";
interface Props {
  datasets: Dataset[];
  onSelect: (d: Dataset) => void;
  message?: string;
}
export default function DatasetTable({
  datasets,
  onSelect
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(
    datasets.length / recordsPerPage
  );
  const startIndex =
    (currentPage - 1) * recordsPerPage;
  const currentDatasets = datasets.slice(
    startIndex,
    startIndex + recordsPerPage
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [datasets]);
  return (
    <div className="overflow-hidden rounded-xl shadow-lg bg-white">
      <div className="overflow-x-auto">
        <table
          className="
            w-full
            bg-white
            text-gray-800
          "
        >
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-4 text-left">
                Title
              </th>
              <th className="p-4 text-left">
                Department
              </th>
              <th className="p-4 text-left">
                Sector
              </th>
              <th className="p-4 text-left">
                Classification
              </th>
              <th className="p-4 text-left">
                Status
              </th>
              <th className="p-4 text-left">
                Formats
              </th>
              <th className="p-4 text-left">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDatasets.length > 0 ? (
              currentDatasets.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => onSelect(d)}
                  className=" border-t hover:bg-indigo-50 cursor-pointer transition">
                  <td className="p-4 font-medium">
                    {d.title}
                  </td>
                  <td className="p-4">
                    {d.department}
                  </td>
                  <td className="p-4">
                    {d.sector}
                  </td>
                  <td className="p-4">
                    <span
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {d.classification}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className="
                        bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                      {d.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      {d.formats?.map((format) => (
                        <span
                          key={format}
                          className="
                            bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs">
                          {format}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    {new Date(
                      d.last_updated
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className=" text-center py-10 text-gray-500">
                  No Record Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {datasets.length > 0 && (
        <div
          className="
            flex items-center justify-between px-6 py-4 border-t bg-slate-50">
          <button
            onClick={() =>
              setCurrentPage(
                (prev) => prev - 1
              )
            }
            disabled={currentPage === 1}
            className=" px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() =>
              setCurrentPage(
                (prev) => prev + 1
              )
            }
            disabled={
              currentPage === totalPages
            }
            className=" px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      )}
    </div>
  );
}