const DataDb = require("../model/model");
const browserObject = require("../instagram/browser");
const scraperController = require("../instagram/page-controller");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  const data = new DataDb({
    link: req.body.link,
    url: req.body.url,
  });

  data
    .save(data)
    .then((response) => {
      res.status(201).send({
        message: "Success",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

exports.run = async (req, res) => {
  try {
    let browserInstance = browserObject.startBrowser();
    const response = await scraperController(browserInstance);
    console.log("Response data is: ", response);
    if (response) {
      postData = response.map(async (item) => {
        const isInDB = await DataDb.find({
          link: item?.link,
        }).limit(1);
        if (isInDB.length > 0) {
          return;
        }
        const data = new DataDb({
          link: item.link,
          url: item.url,
          date: new Date(),
        });
        data.save(data);
      });
      Promise.all(postData);
      res.status(201).send({
        message: "Success",
      });
    }
  } catch (error) {
    res.status(201).send({
      message: "Failed",
    });
  }
};

exports.isInDb = async (req, res) => {
  const isInDB = await DataDb.find({
    link: req.body?.link,
  }).limit(1);
  console.log("is in db: ", isInDB);
  if (isInDB.length > 0) {
    res.status(201).send({
      message: "True",
    });
  } else {
    res.status(201).send({
      message: "False",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    // const previous = `${req.protocol}://${req.get("host")}/api/get?page=${
    //   page - 1
    // }&limit=${limit}`;
    // const next = `${req.protocol}://${req.get("host")}/api/get?page=${
    //   page + 1
    // }&limit=${limit}`;
    const data = await DataDb.find({ $query: {}, $orderby: "date" })
      .limit(limit)
      .skip((page - 1) * limit);
    res.status(200).send({
      total: data.length,
      previous,
      next,
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while getting data",
    });
  }
};
