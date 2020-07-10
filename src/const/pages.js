import { NewOrder } from "../components/NewOrder/NewOrder";
import { TableOrders } from "../components/TableOrders/TableOrders";

const pages = [
	{
		key: "new_order",
		Component: NewOrder,
	},
	{
		key: "table_orders",
		Component: TableOrders,
	},
];

export default pages;
