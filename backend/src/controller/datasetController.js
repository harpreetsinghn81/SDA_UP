const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/seed_datasets.json");
const datasetService = require("../services/datasetService.js");

// ****************************GET All DataSet *******************************//
const getAllDataSets = async (req, res, next) => {
  try {
    const data = await
      datasetService.getAllDataSets(req.query);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch datasets",
      error: error.message
    });
  }

};
// ****************************GET Data Set By Id*******************************//
const getDatasetById = async (req, res, next) => {
  try {
    const dataset = await
      datasetService.getDatasetById(req.params.id);
    if (!dataset) {
      return res.status(404).json({
        message: "Dataset not found"
      });
    }
    res.status(200).json({
      data: dataset
    });
  } catch (error) {
    next(error)
  }
};
// ****************************Add Data Set *******************************//
const addDataset = async (req, res, next) => {
  console.log("*******************");

  try {

    const newDataset =
      await datasetService.addDataset(
        req.body
      );

    res.status(201).json({
      message:
        "Dataset registered successfully",
      data: newDataset
    });

  } catch (error) {
    next(error);
  }
};
// ****************************Get Sectors *******************************//
const getSectors = async (req, res, next) => {
  try {
    const sectors = await datasetService.getSectors();
    res.status(200).json({
      data: sectors
    });
  } catch (error) {
    next(error)
  }
};
// ****************************Add Departments *******************************//
const getDepartments = async (req, res, next) => {
  try {
    const departments = await datasetService.getDepartments();
    res.status(200).json({
      data: departments
    });
  } catch (error) {
    next(error)
  }
};
module.exports = {
  getAllDataSets,
  getDatasetById,
  addDataset,
  getSectors,
  getDepartments
};