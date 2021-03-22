const { Product, Transaction, ProductTransaction, User } = require('../../models/');

exports.getTranscation = async (req, res) => {
    // const { id } = req.params;
    const id = req.userId.id;
    let transaction;



    try {
        const getRoleUser = await User.findByPk(id);

        if (getRoleUser.role === "Partner") {

            dataTransactions = await Transaction.findAll({
                where: { userPartner: id },
                include: {
                    model: Product,
                    through: {
                        model: ProductTransaction,
                        attributes: [],
                    },
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });

            const transactionsString = JSON.stringify(dataTransactions);
            const transactionObject = JSON.parse(transactionsString);

            const userOrder = await User.findByPk(transactionsString.userOrder);
            const userPartner = await User.findByPk(transactionsString.userPartner);

            transaction = transactionObject.map((result) => {

                return {
                    id: result.id,
                    userOrder: userOrder,
                    userPartner: userPartner,
                    status: result.status,
                    products: [...result.Products]

                };
            });
        }

        else if (getRoleUser.role === "User") {

            dataTransactions = await Transaction.findAll({
                where: { userOrder: id },
                include: {
                    model: Product,
                    through: {
                        model: ProductTransaction,
                        attributes: [],
                    },
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });

            const transactionsString = JSON.stringify(dataTransactions);
            const transactionObject = JSON.parse(transactionsString);

            const userOrder = await User.findByPk(transactionsString.userOrder);
            const userPartner = await User.findByPk(transactionsString.userPartner);

            transaction = transactionObject.map((result) => {

                return {
                    id: result.id,
                    userOrder: userOrder,
                    userPartner: userPartner,
                    status: result.status,
                    products: [...result.Products]

                };
            });

        }

        res.send({
            status: "success",
            message: "Products Succesfully Get",
            data: {
                dataTransactions,
            },
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
};


exports.getDetailTranscation = async (req, res) => {
    const { id } = req.params;

    try {

        const transactions = await Transaction.findOne({
            where: { userpartner: id },
            include: {
                model: Product,
                through: {
                    model: ProductTransaction,
                    attributes: [],
                },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            },
            attributes: {
                exclude: ["updatedAt", "createdAt"],
            },
        });


        res.send({
            status: "success",
            message: "Products Succesfully Get",
            data: {
                transactions,
            },
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
};

exports.addTranscation = async (req, res) => {

    // UNDONE -> item yang user pesan harus 1 restaurant

    const { body } = req;
    try {

        const transactions = await Transaction.create({
            // buyer
            userOrder: req.userId.id,
            // partner
            userPartner: body.userPartner,
            status: "Waiting Approve"

        });

        let items = [];

        for (let i = 0; i < body.products.length; i++) {
            items.push({
                ProductId: body.products[i].id,
                TransactionId: transactions.id,
                quantity: body.products[i].qty
            });
        }


        const dataTransactions = await ProductTransaction.bulkCreate(items);

        res.send({
            status: "success",
            message: "Products Succesfully Get",
            data: {
                dataTransactions,
            },
        });



    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
};

exports.updateStatusTransaction = async (req, res) => {

    // UNDONE -> validasi id user dengan id user yang dimiliki oleh table transaksi untuk melakukan update

    const { id } = req.params;
    const { body } = req;
    try {

        const findTransaction = await Transaction.findByPk(id);


        if (!findTransaction) {
            return res.send(
                {
                    status: "fail",
                    message: `transaction with id ${id} not found,
                    `
                }
            );
        }

        const updatedTansaction = await Transaction.update(body, {
            where: {
                id,
            },
        });

        const findUpdatedTransaction = await Transaction.findOne({ where: { id: updatedTansaction } });


        res.send({
            status: "success",
            message: "Transaction Succesfully updated",
            data: {
                findUpdatedTransaction,
            },
        });



    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
};

exports.deleteProduct = async (req, res) => {

    // UNDONE -> validasi id user dengan id user yang dimiliki oleh table transaksi untuk melakukan delete

    try {
        const { id } = req.params;
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

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await Transaction.destroy({ where: { id } });

        res.send({
            status: "successfully deleted",
            data: {
                deletedTransasaction: deletedTransaction
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