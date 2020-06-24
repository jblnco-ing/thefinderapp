import React from "react";
import { PageHeader, Button } from "antd";
import { useFirebaseApp } from "reactfire";

export const Header = ({ title, subTitle, onClick }) => {
	const app = useFirebaseApp();
	const logout = () => {
		app.auth().signOut();
	};

	const groupBtns = [
		<Button onClick={() => onClick(1)} key="list" type="primary">
			List Orders
				</Button>,
		<Button onClick={() => onClick(2)} key="new" type="primary">
			New Order
				</Button>,
		<Button onClick={logout} key="logout" type="primary">
			Logout
				</Button>,
	];

	return (
		<PageHeader
			style={{
				border: "1px solid rgb(235, 237, 240)",
			}}
			ghost={false}
			title={title}
			subTitle={subTitle}
			extra={groupBtns}
		/>
	);
};
