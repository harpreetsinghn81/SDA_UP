import { useEffect, useState } from "react";
import type { Dataset } from "../types/dataset";
interface Props {
    id?: string | undefined;
    close: () => void;
}
export default function DatasetModal({ id, close }: Props) {
    const [dataset, setDataset] = useState<Dataset | null>(null);
    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3000/api/datasets/${id}`)
            .then(res => res.json())
            .then(data => {
                setDataset(data.data || data);
            });
    }, [id]);
    if (!id) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl text-gray-900">
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        {dataset?.title}
                    </h2>
                    <button
                        onClick={close}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                    >
                        ✕
                    </button>
                </div>
                <div className="py-5">
                    <p className="text-sm leading-6 text-gray-600">
                        {dataset?.description}
                    </p>
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