import { useState } from "react";
export default function AddDataset({
  sectors,
  onSuccess
}: any) {
  const sectorList = sectors || [];
  const [form, setForm] = useState({
    title: "",
    department: "",
    sector: "",
    dataFormats: [] as string[],
    updateFrequency: "",
    coverageLevel: "",
    description: "",
    classification: "",
    tags: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleFormatChange = (format: string) => {
    setForm(prev => ({
      ...prev,
      dataFormats:
        prev.dataFormats.includes(format)
          ?
          prev.dataFormats.filter(
            f => f !== format
          )
          :
          [...prev.dataFormats, format]
    }));
  };
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean)
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/datasets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed"
        );
      }
      alert("Dataset Added");
      setForm({
        title: "",
        department: "",
        sector: "",
        dataFormats: [],
        updateFrequency: "",
        coverageLevel: "",
        description: "",
        classification: "",
        tags: ""
      });
      if (onSuccess) {
        onSuccess();
      }
    }
    catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add Dataset
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="sector"
          value={form.sector}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">
            Select Sector
          </option>
          {
            sectorList.map((sector: string) => (
              <option
                key={sector}
                value={sector}
              >
                {sector}
              </option>
            ))
          }
        </select>
        <div>
          <label className="font-semibold">
            Data Formats
          </label>
          <div className="flex gap-4 mt-2 flex-wrap">
            {
              [
                "CSV",
                "XLSX",
                "JSON",
                "API",
                "PDF",
                "GeoJSON"
              ].map(format => (
                <label
                  key={format}
                  className="flex gap-2"
                >
                  <input
                    type="checkbox"
                    checked={
                      form.dataFormats.includes(format)
                    }
                    onChange={() =>
                      handleFormatChange(format)
                    }
                  />
                  {format}
                </label>
              ))
            }
          </div>
        </div>
        <select
          name="updateFrequency"
          value={form.updateFrequency}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">
            Update Frequency
          </option>
          <option>Daily</option>
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Annual</option>
          <option>Seasonal</option>
          <option>One-time</option>
        </select>
        <select
          name="coverageLevel"
          value={form.coverageLevel}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">
            Coverage Level
          </option>
          <option>Village</option>
          <option>Block</option>
          <option>District</option>
          <option>Division</option>
          <option>State</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border p-2 rounded"
        />
        <select
          name="classification"
          value={form.classification}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">
            Classification
          </option>
          <option>
            Public
          </option>
          <option>
            Restricted
          </option>
          <option>
            Confidential
          </option>
        </select>
        <input
          type="text"
          name="tags"
          placeholder="health, survey, agriculture"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Dataset
        </button>      </form>
    </div>
  );
}