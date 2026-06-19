import { useEffect, useState } from "react";
import type { Dataset } from "../types/dataset";
interface Props {
    id?: string | undefined;
    close: () => void;
}
export default function DatasetModal({ id, close }: Props) {
    debugger
    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [dataset, setDataset] = useState<Dataset | null>(null);
    useEffect(() => {
        if (!id) return;
        fetch(baseUrl + `/api/datasets/${id}`)
            .then(res => res.json())
            .then(data => {
                setDataset(data.data || data);
            });
    }, [id]);
    if (!id) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
        <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl text-gray-900">
            <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    {dataset?.title}
                </h2>
                <button
                    onClick={close}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                >
                    ✕
                </button>
            </div>
            <div className="py-6 space-y-4">
                <div>
                    <h3 className="font-semibold text-gray-700">
                        Description
                    </h3>
                    <p className="text-gray-600 mt-1">
                        {dataset?.description}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="font-semibold text-gray-700">
                            ID:
                        </span>
                        <p>{dataset?.id}</p>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">
                            Department:
                        </span>
                        <p>{dataset?.department}</p>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">
                            Sector:
                        </span>
                        <p>{dataset?.sector}</p>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">
                            Classification:
                        </span>
                        <p>{dataset?.classification}</p>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">
                            Status:
                        </span>
                        <p>{dataset?.status}</p>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">
                            Last Updated:
                        </span>
                        <p>
                            {dataset?.last_updated
                                ? new Date(
                                      dataset.last_updated
                                  ).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                        Formats
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {dataset?.formats?.map((format) => (
                            <span
                                key={format}
                                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm"
                            >
                                {format}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-end border-t pt-4">
                <button
                    onClick={close}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);
}