import { useEffect, useState } from "react";
import type { Dataset } from "../types/dataset";
import DatasetFilters from "../components/DatasetFilters";
import DatasetTable from "../components/DatasetTable";
import DatasetModal from "../components/DatasetModal";
import AddDataset from "../components/AddDataset";

export default function DataCatalog() {
    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [search, setSearch] = useState("");
    const [filterSector, setSector] = useState("");
    const [sectors, setSectors] = useState<string[]>([]);
    const [classification, setClassification] = useState("");
    const [selected, setSelected] = useState<Dataset | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        getSectors();
    }, []);
    useEffect(() => {
        getFilterDatasets();
    }, [
        search,
        filterSector,
        classification
    ]);

    const getSectors = () => {
        fetch(baseUrl + "/api/sectors")
            .then(res => res.json())
            .then(data => {
                setSectors(data.data);
            });
    };
    const getFilterDatasets = async () => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (filterSector) params.append("sector", filterSector);
        if (classification) params.append("classification", classification);
        const res = await fetch(
            baseUrl + `/api/datasets?${params.toString()}`,
            {
                cache: "no-store"
            }
        );

        const data = await res.json();

        if (Array.isArray(data)) {
            setDatasets(data);
            setMessage("");
        } else if (Array.isArray(data.data)) {
            setDatasets(data.data);
            setMessage(
                data.data.length === 0 ? data.message : ""
            );
        } else {
            setDatasets([]);
            setMessage(data.message || "No Record Found");
        }
    };
    return (
        <>
            <div className="p-6 bg-slate-100 min-h-screen">
                <div className="bg-gradient-to-r from-slate-800 to-indigo-700 rounded-3xl p-8 mb-8 shadow-lg text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold">
                                Data Directory
                            </h1>
                            <p className="mt-2 text-blue-100 text-lg">
                                View, search and manage all registered data in one place
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6
                                        py-3 rounded-xl shadow-md transition-all duration-300">
                            Add New Data
                        </button>
                    </div>
                </div>
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Search & Filter Data
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Search by Title, Description, Sector or Classification.
                    </p>
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
                />
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-medium text-gray-700">
                        Showing {datasets.length} Records
                    </div>
                </div>
                <DatasetTable
                    datasets={
                        [...datasets].sort(
                            (a: Dataset, b: Dataset) =>
                                new Date(b.last_updated).getTime() -
                                new Date(a.last_updated).getTime()
                        )
                    }
                    onSelect={setSelected}
                    message={message}
                />
                <DatasetModal
                    id={selected?.id}
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
                        <AddDataset
                            sectors={sectors}
                            onSuccess={(newData: any) => {
                                setDatasets(prev => [
                                    newData.data,
                                    ...prev
                                ]);
                                setShowAddModal(false);
                            }}
                        />            </div>
                </div>
            )}
        </>
    );
}