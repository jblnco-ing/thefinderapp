import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useUser } from "reactfire";
import { Header } from "../components/Header/Header";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Footer } from "../components/Footer/Footer";
import { MainMenu } from "../components/MainMenu/MainMenu";
import pages from "../const/pages";

const Dashboard = ({ history }) => {
	const [key, setKey] = useState("table_orders");
	const { Content, Sider } = Layout;
	const user = useUser();

	const handleClick = (key) => {
		setKey(key);
	};

	const SelectPage = ({ keyPage }) => {
		const page = pages.find((page) => page.key === keyPage);
		if (page) {
			return <page.Component />;
		}
		return <div></div>;
	};

	useEffect(() => {
		if (user === null) {
			history.push("/Login");
		}
	}, [history, user]);
	return (
		<Layout style={{ height: "100vh" }}>
			<Header title="The Finder App" subTitle="Admin" />
			<Layout>
				<Sider>
					<MainMenu handleClick={handleClick} />
				</Sider>
				<Layout>
					<Content style={{ padding: "0 50px", marginTop: 40 }}>
						<SelectPage keyPage={key} />
					</Content>
				</Layout>
			</Layout>
			<Footer />
		</Layout>
	);
};

export default withRouter(Dashboard);
