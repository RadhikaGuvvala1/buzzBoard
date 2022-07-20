var order = require("../Controllers/orderController");



exports.getRouter = (app) => {
    
app.route("/orders/create").post(order.createOrder);
app.route("/orders/update").post(order.updateOrder);
app.route("/orders/list").post(order.listOrders);
app.route("/orders/search").get(order.searchOrder);
app.route("/orders/delete/:order_id").get(order.deleteOrder);

};