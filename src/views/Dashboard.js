import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useUser } from "reactfire";
import { Header } from "../components/Header/Header";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Footer } from "../components/Footer/Footer";
import { NewOrder } from "../components/NewOrder/NewOrder";
import { LIstOrdersRow } from "../components/ListOrdersRow/LIstOrdersRow";

const Dashboard = ({ history }) => {
	const [page, setpage] = useState(1);
	
	const handleClick = (page) => {
		console.log(page);	
		setpage(page);
	};
	const { Content } = Layout;
	const user = useUser();

	const SelectPage = ({page}) => {
		switch (page) {
			case 1:
				return <NewOrder />;
			case 2:
				return <LIstOrdersRow/>;
			default:
				return <LIstOrdersRow />;
		}
	};

	useEffect(() => {
		if (user === null) {
			history.push("/Login");
        }
	}, [history, user]);
	return (
		<Layout style={{ height: "100vh" }}>
			<Header title="The Finder App" subTitle="Admin" onClick={handleClick} />
			<Content style={{ padding: "0 50px", marginTop: 40 }}>
				<SelectPage page={page}/>
			</Content>
			<Footer/>
		</Layout>
	);
};

export default withRouter(Dashboard);