import React, { useState } from "react";
import { Menu } from "antd";
import { pages, menuItems } from "../../const/pages";

export const MainMenu = ({ handleClick }) => {
	const { SubMenu } = Menu;
	const [openKeys, setOpenKeys] = useState([]);
	const submenusLevel_0 = menuItems.map((item) => item.key);

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
		console.log(key);
		handleClick(key);
	};

	const subMenus = (data) =>
		data.length ? (
			data.map((page) => (
				<SubMenu key={page.key} title={page.title}>
					{page.menuItems.map((item) => (
						<Menu.Item key={item.key} onClick={selectItem}>
							{item.text}
						</Menu.Item>
					))}
				</SubMenu>
			))
		) : (
			<div>No page</div>
		);

	return (
		<Menu
			mode="inline"
			openKeys={openKeys}
			onOpenChange={onOpenChange}
			style={{ height: "100%", borderRight: 0 }}
		>
			{subMenus(pages)}
		</Menu>
	);
};
