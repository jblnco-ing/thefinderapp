import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useUser } from "reactfire";
import { Header } from "../components/Header";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Footer } from "../components/Footer";

const Dashboard = ({ history }) => {
	const { Content } = Layout;
	const user = useUser();
	const [name, setname] = useState(null);

	useEffect(() => {
		if (user === null) {
			history.push("/Login");
        }
        console.log(user);
        
        user?user.displayName?setname(user.displayName):setname(user.email):setname(null)
	}, [history, user]);
	return (
		<Layout style={{ height: "100vh" }}>
			<Header title="The Finder App" subTitle="Admin" />
			<Content style={{ padding: "0 50px", marginTop: 40 }}>
				<div
					style={{
						background: "#fff",
						padding: 24,
						minHeight: "80vh",
					}}
				>
					Hola {name} :)
				</div>
			</Content>
			<Footer/>
		</Layout>
	);
};

export default withRouter(Dashboard);