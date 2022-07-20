const orderModel = require("../Models/orderModel");


/**Create Order  */
exports.createOrder = async (req, res) => {
    try {
        /**Check if order_is is already  existed or not */
        if (!req.body.order_id) {
            return res.status(400).json("Missing Order_id");
        }
        const checkOrder = await orderModel.find({ order_id: req.body.order_id });
        if (checkOrder.length) {
            return res.status(400).json({
                message: "Order id already exists",
            });
        }
        const orderData = new orderModel({
            order_id: req.body.order_id,
            item_name: req.body.item_name,
            cost: req.body.cost,
            order_date: req.body.order_date,
            delivery_date: req.body.delivery_date
        });

        /**Insert into database */
        let order = await orderData.save();

        if (order) {

            return res.json(order);
        } else {

            return res.json({
                code: 400,
                message: "Error",
            });
        }
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: error.message,
        });
    }
};

/**update order */
exports.updateOrder = async (req, res) => {
    try {
        let orderData = {};
        if (!req.body.order_id) {
            return res.status(400).json("Missing Order_id");
        }
        const order = await orderModel.find({ order_id: req.body.order_id });
        if (!order.length) {
            //responses.userNotExist(res);
            return res.status(400).json("Order id does not exist");
        } else {

            orderData.delivery_date = req.body.delivery_date;

            let Info = await orderModel.findOneAndUpdate(
                { order_id: req.body.order_id },
                {
                    $set: orderData,
                },
                {
                    new: true,
                }
            );
            return res.status(200).json({ message: "success", data: Info });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
/**list orders */
exports.listOrders = async (req, res) => {
    try {

        let date = req.body.date;

        if (!date) {
            return res.status(400).json("Missing date");
        }

        const result = await orderModel.find({ order_date: date }).sort({ createdAt: -1 });
        if (!result.length)
            return res.status(204).json({ message: "No Data Found" });
        return res.json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

/**search order */
exports.searchOrder = async (req, res) => {
    try {
        let query = {};
        let search = req.query.search;

        if (search && search !== "") {
            query["$or"] = [];
            query["$or"].push({ order_id: { $regex: search, $options: "i" } });
        }

        const result = await orderModel.find(query).sort({ createdAt: -1 });
        if (!result.length)
            return res.status(204).json({ message: "No Data Found" });
        return res.json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
/**delete order */
exports.deleteOrder = async (req, res) => {

    try {
        if (!req.params.order_id) {
            return res.status(400).json("Missing order_id");
        }

        const Info = await orderModel.findOneAndDelete(
            { order_id: req.params.order_id }
        );
        if (!Info) return res.status(400).json({ message: "Order does not exist" });
        return res.json("Successfully deleted");

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
