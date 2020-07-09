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
import { MNewClient } from "../modals/MNewClient/MNewClient";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { useFirestoreCollection } from "reactfire";
import moment from "moment";
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
	const clientsCollection = storeCollection(clientsRef.orderBy('name'));
	const clients = clientsCollection.docs.map((d) => ({
		id: d.id,
		...d.data(),
	}));
	const [visible, setVisible] = useState(false);
	const [client, setclient] = useState(0);

	const saveOrder = (data, doc_id) => {
		
		message
			.loading('Action in progress..');
		clientsRef
			.doc(doc_id)
			.collection("orders")
			.doc()
			.set(data)
			.then(
				(res) => {
					message.success('Loading finished', 2.5);
					// console.log(res);
				},
				(error) => {
					console.error(error);
					message.error('Oh Oh', 2.5);
				}
			);
	};

	const showUserModal = () => {
		setVisible(true);
	};

	const hideUserModal = () => {
		setVisible(false);
	};

	const handleChange = (value) => {
		const client = clients.find((item) => item.id === value);
		setclient(client);
	};

	const onFinish = (values) => {
		values.date = values.date.format("L");
		const date = moment().format("L").toString();
		const data = {
			...values,
			client: `${client.name} ${client.description}`,
			createdAt: date,
			updatedAt: date,
		};
		// console.log(data);
		saveOrder(data, client.id);
	};

	const options = (clients) =>
		clients.length ? (
			clients.map((client, index) => (
				<Option key={index} value={client.id}>
					{client.name} {client.description}
				</Option>
			))
		) : (
			<Option value="0">No Client</Option>
		);
	return (
		<div>
			<Form {...layout} name="newOrderForm" onFinish={onFinish}>
				<Form.Item label="Client">
					<Row>
						<Col span={16}>
							<Form.Item
								noStyle
								shouldUpdate={(prevValues, curValues) =>
									prevValues.clients !== curValues.clients
								}
								rules={[
									{
										required: true,
									},
								]}
							>
								<Select onChange={handleChange}>
									{options(clients)}
								</Select>
							</Form.Item>
						</Col>
						<Col>
							<Button
								htmlType="button"
								style={{
									margin: "0 8px",
								}}
								onClick={showUserModal}
							>
								Add Client
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
				visible={visible}
				onCancel={hideUserModal}
				useResetFormOnCloseModal={useResetFormOnCloseModal}
			/>
		</div>
	);
};
