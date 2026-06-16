const fs = require("fs");
const path = require("path");
const jsonDataSets = require("../data/seed_datasets.json");
const filePath = path.join(__dirname, "../data/seed_datasets.json");

let jsonData = [...jsonDataSets];
// ***********************Get all datasets with filters**************************//
const getAllDataSets = (query) => {
  let result = [...jsonData];
  const {
    sector,
    classification,
    status,
    search
  } = query;
  console.log(query);

  if (sector) {
    result = result.filter(
      (item) =>
        item.sector?.toLowerCase() ===
        sector.toLowerCase()
    );
  }
  if (classification) {
    result = result.filter(
      (item) =>
        item.classification?.toLowerCase() ===
        classification.toLowerCase()
    );
  }
  if (status) {
    result = result.filter(
      (item) =>
        item.status?.toLowerCase() ===
        status.toLowerCase()
    );
  }
  if (search) {
    const keyword = search.toLowerCase();
    result = result.filter(
      (item) =>
        item.title?.toLowerCase()
          .includes(keyword)
        ||
        item.description?.toLowerCase()
          .includes(keyword)
    );
  }
  if (result.length === 0) {
    return {
      message: "No datasets found",
      data: []
    };
  }
  return result;
};
// **************Get dataset by ID*****************//
const getDatasetById = (id) => {
  return jsonData.find(
    (item) =>
      item.id == (id)
  );
};
const addDataset = async (datasetData) => {
  const datasets = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );
  const randomNo = Math.floor(Math.random() * 100);
  const id = `UP-TST-${String(randomNo).padStart(2, "0")}`;
  const newDataset = {
    id: id,
    ...datasetData,
    status: "Pending",
    last_updated:
      new Date().toISOString()
  };
  datasets.push(newDataset);
  fs.writeFileSync(
    filePath,
    JSON.stringify(
      datasets,
      null,
      2
    )
  );

  return newDataset;
};
// *************Get sectors******************//
const getSectors = () => {
  return [
    ...new Set(
      jsonData.map(
        item => item.sector
      )
    )
  ];
};
// ***********************Get departments********************//
const getDepartments = () => {
  return [
    ...new Set(
      jsonData.map(
        item => item.department
      )
    )
  ];
};
module.exports = {
  getAllDataSets,
  getDatasetById,
  addDataset,
  getSectors,
  getDepartments
};