const { User } = require("../../models/");

exports.getUser = async (req, res) => {
    try {
        const users = await User.findAll();

        res.send({
            status: "success",
            data: {
                users: users
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "server error"
        });
    }
};


exports.registerUser = async (req, res) => {
    try {
        const { body } = req;
        const newUser = await User.create(body);
        const { fullname, role } = newUser;

        res.send({
            status: "success",
            data: {
                user: {
                    fullname: fullname,
                    role: role
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "server error"
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const newUser = await User.destroy({ where: { id } });

        res.send({
            status: "successfully deleted",
            data: {
                id: id
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "server error"
        });
    }
};
