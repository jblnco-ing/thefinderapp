import React, { useState } from "react";
import { Menu } from "antd";

export const MainMenu = ({ handleClick }) => {
	const { SubMenu } = Menu;
	const [openKeys, setOpenKeys] = useState(["products"]);
	const submenusLevel_0 = ["products", "orders", "clients"];

	const onOpenChange = (keys) => {
		console.log(keys);

		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (submenusLevel_0.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};
	const selectItem = ({ key }) => {
		// console.log(key);
		handleClick(key);
	};

	return (
		<Menu
			mode="inline"
			openKeys={openKeys}
			onOpenChange={onOpenChange}
			style={{ height: "100%", borderRight: 0 }}
		>
			<SubMenu key="products" title="Products">
				<Menu.Item key="new_product" onClick={selectItem}>
					New Product
				</Menu.Item>
			</SubMenu>
			<SubMenu key="orders" title="Orders">
				<Menu.Item key="new_order" onClick={selectItem}>
					New Order
				</Menu.Item>
				<Menu.Item key="table_orders" onClick={selectItem}>
					Table Orders
				</Menu.Item>
			</SubMenu>
			<SubMenu key="clients" title="Clients">
				<Menu.Item key="new_client" onClick={selectItem}>
					New Client
				</Menu.Item>
			</SubMenu>
		</Menu>
	);
};
