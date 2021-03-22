const { User } = require("../../models");

exports.checkRolePartner = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId.id,
      },
    });

    if (user.role === "Partner") {
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "You have no authorization to do this",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "You have no authorization to do this",
    });
  }
};

exports.checkRoleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId.id,
      },
    });

    if (user.role === "User") {
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "You have no authorization to do this",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "You have no authorization to do this",
    });
  }
};
