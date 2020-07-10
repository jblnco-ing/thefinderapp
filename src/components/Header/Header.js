import React from "react";
import { PageHeader, Button } from "antd";
import { useFirebaseApp } from "reactfire";

export const Header = ({ title, subTitle }) => {
	const app = useFirebaseApp();

	const logout = () => {
		app.auth().signOut();
	};

	const groupBtns = [
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
