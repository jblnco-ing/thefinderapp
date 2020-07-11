import { NewOrder } from "../components/NewOrder/NewOrder";
import { TableOrders } from "../components/TableOrders/TableOrders";

const pages = [
	{
		key: "orders",
		title: "Orders",
		menuItems: [
			{
				key: "new_order",
				Component: NewOrder,
				text: "New Order",
			},
			{
				key: "table_orders",
				Component: TableOrders,
				text: "Table Order",
			},
		],
	},
];

const menuItems = pages.length
	? pages.map((object) => object["menuItems"]).reduce((a, b) => a.concat(b))
	: [];

export { pages, menuItems };
