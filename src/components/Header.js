import React from "react";
import { PageHeader, Button } from "antd";
import { useFirebaseApp } from "reactfire";

export const Header = ({ title, subTitle }) => {
	const app = useFirebaseApp();
	const logout = () => {
		app.auth().signOut();
	};

	return (
		<PageHeader
			style={{
				border: "1px solid rgb(235, 237, 240)",
			}}
			title={title}
			subTitle={subTitle}
			extra={[
				<Button onClick={logout} key="logout" type="primary">
					Logout
				</Button>,
			]}
		/>
	);
};
