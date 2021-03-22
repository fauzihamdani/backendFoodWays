
const { Product, User } = require('../../models/');
const Joi = require("joi");

exports.getProducts = async (req, res) => {

    try {
        const products = await Product.findAll({
            include: {
                model: User,
                attributes: { exclude: ["createdAt", "updatedAt", "password", "id", "image", "role"] }
            }
        });

        res.send({
            status: "success",
            data: {
                products: products
            }
        });
    } catch (error) {
        console.log(error);
    }

};


exports.getProductsByPartner = async (req, res) => {

    const { id } = req.params;

    try {
        const products = await Product.findAll(
            {
                where: { UserId: id }
            });

        res.send({
            status: "success",
            data: {
                products: products
            }
        });
    } catch (error) {
        console.log(error);
    }

};


exports.getDetailProduct = async (req, res) => {

    const { id } = req.params;

    try {
        const product = await Product.findOne(
            {
                where: { id: id },
                include:
                    { model: User, attributes: { exclude: ['fullname', 'email', 'phone', 'location'] } },
                attributes: { exclude: ["createdAt", "updatedAt", "UserId"], }
            });

        res.send({
            status: "success",
            data: {
                product: product
            }
        });
    } catch (error) {
        console.log(error);
    }

};




exports.addProduct = async (req, res) => {
    try {
        const { body } = req;
        console.log("response body", body);

        //     const product = await Product.create(
        //         {
        //             title: req.body.title,
        //             price: req.body.price,
        //             image: req.files.imageFile[0].filename,
        //             userId: 2
        //         }
        //     );

        //     const productWithUser = await Product.findOne(
        //         {
        //             where: { id: product.id },
        //             include: { model: User, attributes: { exclude: ["image", "role", "password", "createdAt", "updatedAt"] } },
        //             attributes: { exclude: ["userId", "UserId", "createdAt", "updatedAt"] }
        //         }
        //     );

        //     res.send({
        //         status: "success",
        //         data: {
        //             product: productWithUser
        //         }
        //     });
    } catch (error) {
        console.log(error);
    }
};

exports.updateProduct = async (req, res) => {
    // UNDONE -> validasi id user dengan id user yang dimiliki oleh table product untuk melakukan update

    // const { id } = req.params;
    // const { body } = req;
    // console.log(id);
    // try {


    //     const updatedProductId = await Product.update(body, {
    //         where: {
    //             id,
    //         },
    //     });

    //     const product = await Product.findByPk(id);

    //     if (!product) {
    //         return res.send(
    //             {
    //                 status: "fail",
    //                 message: `product with id ${id} not found,
    //                 `
    //             }
    //         );
    //     }

    //     if (product) {
    //         return (
    //             res.send({
    //                 status: "success",
    //                 data: {
    //                     product: product
    //                 }
    //             })
    //         );
    //     }
    // } catch (error) {
    //     console.log(error);
    // }

};

exports.deleteProduct = async (req, res) => {
    // UNDONE -> validasi id user dengan id user yang dimiliki oleh table product utk melakukan delete

    try {
        const { id } = req.params;

        const getProduct = await Product.findByPk(id);

        if (!getProduct) {
            return res.send(
                {
                    status: "fail",
                    message: `product Not Found`
                }
            );
        }

        if (getProduct.userId !== req.userId.id) {
            return res.send(
                {
                    status: "fail",
                    message: `You have no authorization to do this.`
                }
            );
        }

        const deletedProduct = await Product.destroy({ where: { id } });

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
