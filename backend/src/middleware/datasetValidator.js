const validateDataSet = (req, res, next) => {
  const {
    title,
    department,
    sector,
    formats,
    update_frequency,
    description,
    classification,
  } = req.body;
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
  if (!formats || formats.length === 0) {
    return res.status(422).json({
      message: "Please select at least one Data format",
    });
  }

  if (!update_frequency) {
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