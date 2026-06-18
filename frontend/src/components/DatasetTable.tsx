import type { Dataset } from "../types/dataset";
interface Props {
  datasets: Dataset[];
  onSelect: (d: Dataset) => void;
}
export default function DatasetTable({ datasets, onSelect }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table
        className="
            w-full
            bg-white
            text-gray-800
        "
      >
        <thead className="bg-red-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Sector</th>
            <th className="p-4 text-left">Classification</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Formats</th>
            <th className="p-4 text-left">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((d) => (
            <tr
              key={d.id}
              onClick={() => onSelect(d)}
              className="
                    border-t
                    hover:bg-red-50
                    cursor-pointer
                    "
            >
              <td className="p-4 font-medium">{d.title}</td>
              <td className="p-4">{d.department}</td>
              <td className="p-4">{d.sector}</td>
              <td className="p-4">
                <span
                  className="
                        bg-red-100
                        text-red-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        "
                >
                  {d.classification}
                </span>
              </td>
              <td className="p-4">
                <span
                  className="
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        "
                >
                  {d.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2 flex-wrap">
                  {d.formats?.map((format) => (
                    <span
                      key={format}
                      className="
                                bg-gray-200
                                px-2
                                py-1
                                rounded
                                text-xs
                                "
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4"> {new Date(d.last_updated).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
