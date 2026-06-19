import type { Dataset } from "../types/dataset";

type Props = {
  datasets: Dataset[];
  sectors: string[];
  search: string;
  setSearch: (value: string) => void;
  sector: string;
  setSector: (value: string) => void;
  classification: string;
  setClassification: (value: string) => void;
};

export default function DatasetFilters({
  search,
  setSearch,
  sector,
  setSector,
  classification,
  setClassification,
  sectors
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Search Title/Description..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
        <select
          className="border p-2 rounded"
          value={sector}
          onChange={(e) =>
            setSector(e.target.value)
          }
        >
          <option value="">
            All Sector
          </option>
          {sectors.map((s) => (
            <option
              key={s}
              value={s}
            >
              {s}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={classification}
          onChange={(e) =>
            setClassification(e.target.value)
          }
        >
          <option value="">
            All Classification
          </option>
          <option value="Public">
            Public
          </option>
          <option value="Restricted">
            Restricted
          </option>
          <option value="Confidential">
            Confidential
          </option>
        </select>
      </div>
    </div>
  );
}