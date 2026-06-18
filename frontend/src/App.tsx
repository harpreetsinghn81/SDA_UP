import { useEffect, useState } from "react";
import type { Dataset } from "./types/dataset";
import DatasetFilters from "./components/DatasetFilters";
import DatasetTable from "./components/DatasetTable";
import DatasetModal from "./components/DatasetModal";
import AddDataset from "./components/AddDataset";
export default function App() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [search, setSearch] = useState("");
  const [filterSector, setSector] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [classification, setClassification] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Dataset | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);


  
  useEffect(() => {
    getSectors();
  }, []);
  useEffect(() => {
    getFilterDatasets();
  }, [
    search,
    filterSector,
    classification,
    status
  ]);
  const getSectors = () => {
    fetch("http://localhost:3000/api/sectors")
      .then(res => res.json())
      .then(data => {
        setSectors(data.data);
      });
  };
  const getFilterDatasets = async () => {
    const params = new URLSearchParams();
    if (search) {
      params.append(
        "search",
        search
      );
    }
    if (filterSector) {
      params.append(
        "sector",
        filterSector
      );
    }
    if (classification) {
      params.append(
        "classification",
        classification
      );
    }
    if (status) {
      params.append(
        "status",
        status
      );
    }
    const res = await fetch(
      `http://localhost:3000/api/datasets?${params.toString()}`
    );
    const data = await res.json();
    setDatasets(data);
  };
  return (
    <>
      <div className="p-6 bg-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Metadata Registry Dataset
        </h1>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium text-gray-700">
            Showing {datasets.length} datasets
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Dataset
          </button>
        </div>
        <DatasetFilters
          datasets={datasets}
          sectors={sectors}
          search={search}
          setSearch={setSearch}
          sector={filterSector}
          setSector={setSector}
          classification={classification}
          setClassification={setClassification}
          status={status}
          setStatus={setStatus}
        />
        <DatasetTable
          datasets={datasets}
          onSelect={setSelected}
        />
        <DatasetModal
          dataset={selected}
          close={() => setSelected(null)}
        />
      </div>
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowAddModal(false)}>
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">✕
            </button>
            <AddDataset sectors={sectors} />
          </div>
        </div>
      )}
    </>
  );
}