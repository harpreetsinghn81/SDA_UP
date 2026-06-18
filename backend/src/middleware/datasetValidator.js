const validateDataSet = (req, res, next) => {
  const {
    title,
    department,
    sector,
    dataFormats,
    updateFrequency,
    description,
    classification,
  } = req.body;
  console.log(req.body);
  

  if (!title) {
    return res.status(422).json({
      message: "Title is required",
    });
  }

  if (!department) {
    return res.status(422).json({
      message: "Department is required",
    });
  }

  if (!sector) {
    return res.status(422).json({
      message: "Sector is required",
    });
  }
console.log(dataFormats.length);

  if (!dataFormats || dataFormats.length === 0) {
    return res.status(422).json({
      message: "Select at one format",
    });
  }

  if (!updateFrequency) {
    return res.status(422).json({
      message: "Update frequency is required",
    });
  }

  if (!description) {
    return res.status(422).json({
      message: "Description is required",
    });
  }

  if (!classification) {
    return res.status(422).json({
      message: "Classification is required",
    });
  }
  next();
};

module.exports = validateDataSet;