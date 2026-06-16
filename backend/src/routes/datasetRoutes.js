const express = require("express");

const {
  getAllDataSets,
  getDatasetById,
  getSectors,
  addDataset,
  getDepartments,
} = require("../controller/datasetController");

const validateDataSet = require(
  "../middleware/datasetValidator"
);
const router = express.Router();

router.get("/datasets", getAllDataSets);

router.get("/datasets/:id", getDatasetById);

router.post("/datasets",validateDataSet, addDataset);

router.get("/sectors", getSectors);

router.get("/departments",getDepartments);

module.exports = router;