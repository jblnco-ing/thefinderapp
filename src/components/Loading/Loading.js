import React from "react";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const Loading = () => {
	const { Content } = Layout;

	const antIcon = <LoadingOutlined style={{ fontSize: 100, color:"@primary-color" }} spin />;
	return (
        <Layout style={{ height: "100vh" }}>
			<Content
				style={{
					padding: "0 50px",
					marginTop: 40,
					display: "flex",
					justifyContent: "center",
                    alignItems: "center",
					height: "100%",
				}}
			>
				<Spin size="large" indicator={antIcon} />
			</Content>
		</Layout>
	);
};
