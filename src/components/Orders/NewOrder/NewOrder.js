import React, { useState, useEffect, useRef, useContext } from "react";
import {
	Form,
	Input,
	InputNumber,
	Button,
	Select,
	Row,
	Col,
	DatePicker,
	message,
	
} from "antd";
import { MNewClient } from "../../modals/MNewClient/MNewClient";
import { DatabaseContext } from "../../../contexts/DatabaseContext";
import { useFirestoreCollection } from "reactfire";
import moment from "moment";
import { MNewState } from "../../modals/MNewState/MNewState";
const { Option } = Select;
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 12,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
	const prevVisibleRef = useRef();

	useEffect(() => {
		prevVisibleRef.current = visible;
	}, [visible]);

	const prevVisible = prevVisibleRef.current;

	useEffect(() => {
		if (!visible && prevVisible) {
			form.resetFields();
		}
	});
};

export const NewOrder = () => {
	const storeCollection = useFirestoreCollection;
	const { store } = useContext(DatabaseContext);
	const clientsRef = store().collection("clients");
	const statesRef = store().collection("states");
	const ordersRef = store().collection("orders");
	const clientsCollection = storeCollection(clientsRef.orderBy("name"));
	const statesCollection = storeCollection(statesRef.orderBy("name"));
	const clients = clientsCollection.docs.map((d) => ({
		id: d.id,
		...d.data(),
	}));
	const states = statesCollection.docs.map((d) => ({
		id: d.id,
		...d.data(),
	}));
	const [visibleClient, setVisibleClient] = useState(false);
	const [visibleState, setVisibleState] = useState(false);
	// const [client, setclient] = useState(0);
	let client = {};
	let state = {};
	const saveOrder = (data) => {
		message.loading("Action in progress..");
		ordersRef
			.doc()
			.set(data)
			.then(
				(res) => {
					message.success("Loading finished", 2.5);
					// console.log(res);
				},
				(error) => {
					console.error(error);
					message.error("Oh Oh", 2.5);
				}
			);
	};

	const showModal = (callback) => {
		callback(true);
	};

	const hideModal = (callback) => {
		callback(false);
	};

	const handleChange = (value, items) => {
		return items.find((item) => item.id === value);
	};

	const onFinish = (values) => {
		values.date = values.date.format("L");
		const date = moment().format("L").toString();
		const data = {
			...values,
			id_client: client.id,
			id_state: state.id,
			createdAt: date,
			updatedAt: date,
		};
		// console.log(data);
		saveOrder(data);
	};

	const optionsClient = (clients) =>
		clients.length ? (
			clients.map((client, index) => (
				<Option key={index} value={client.id}>
					{client.name} {client.description}
				</Option>
			))
		) : (
			<Option value="0">No Client</Option>
		);
	const optionsState = (states) =>
		states.length ? (
			states.map((state, index) => (
				<Option key={index} value={state.id} style={{color: state.color}} >
					{state.name}
				</Option>
			))
		) : (
			<Option value="0">No State</Option>
		);

	return (
		<div>
			<Form {...layout} name="newOrderForm" onFinish={onFinish}>
				<Form.Item
					label="Client"
				>
					<Row>
						<Col span={16}>
							<Form.Item
								noStyle
								shouldUpdate={(prevValues, curValues) =>
									prevValues.clients !== curValues.clients
								}
							>
								<Select
									onChange={(id) => { client = handleChange(id, clients) }}
									>
									{optionsClient(clients)}
								</Select>
							</Form.Item>
						</Col>
						<Col>
							<Button
								htmlType="button"
								style={{
									margin: "0 8px",
								}}
								onClick={() => { showModal(setVisibleClient) }}
								>
								Add Client
							</Button>
						</Col>
					</Row>
				</Form.Item>
				<Form.Item label="State">
					<Row>
						<Col span={16}>
							<Form.Item
								noStyle
								shouldUpdate={(prevValues, curValues) =>
									prevValues.states !== curValues.states
								}
								>
								<Select
									onChange={(id) => { state = handleChange(id, states) }}
								>
									{optionsState(states)}
								</Select>
							</Form.Item>
						</Col>
						<Col>
							<Button
								htmlType="button"
								style={{
									margin: "0 8px",
								}}
								onClick={() => { showModal(setVisibleState) }}
							>
								Add State
							</Button>
						</Col>
					</Row>
				</Form.Item>
				<Form.Item label="Date" name="date" initialValue={moment()}>
					<DatePicker />
				</Form.Item>
				<Form.Item
					name="name"
					label="Product Name"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="description"
					label="Product Description"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input.TextArea />
				</Form.Item>
				<Form.Item
					name="cost"
					label="Cost"
					rules={[
						{
							required: true,
						},
					]}
				>
					<InputNumber />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button htmlType="submit" type="primary">
						Submit
					</Button>
				</Form.Item>
			</Form>
			<MNewClient
				visible={visibleClient}
				onCancel={() => { hideModal(setVisibleClient) }}
				useResetFormOnCloseModal={useResetFormOnCloseModal}
			/>
			<MNewState
				visible={visibleState}
				onCancel={() => { hideModal(setVisibleState) }}
				useResetFormOnCloseModal={useResetFormOnCloseModal}
			/>
		</div>
	);
};
