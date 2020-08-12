import React, { useState, useContext } from "react";
import {
	Table, Input, Popconfirm, Form, Tooltip, Select
	// , Button
} from "antd";
import { DatabaseContext } from "../../../contexts/DatabaseContext";
import { useFirestoreCollection } from "reactfire";
import Text from "antd/lib/typography/Text";
// import { EditOutlined } from "@ant-design/icons";

const SelectState = ({ states, handleChange }) => {
	const { Option } = Select;
	const optionsState = (states) =>
		states.length ? (
			states.map((state, index) => (
				<Option
					key={index}
					value={state.id}
					style={{ color: state.color }}
				>
					{state.name}
				</Option>
			))
		) : (
				<Option value="0">No State</Option>
			);
	return (
		<Select
			// value={Select}
			onChange={(id) => {
				handleChange(id);
			}}
		>
			{optionsState(states)}
		</Select>
	);
}

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	states,
	handleChange,
	...restProps
}) => {
	const inputNode = inputType === "select" ? <SelectState states={states} handleChange={handleChange} /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
					children
				)}
		</td>
	);
};



export const TableOrders = () => {
	const { store } = useContext(DatabaseContext);
	const storeCollection = useFirestoreCollection;
	const ordersColletion = store()
		.collection("orders");
	const statesRef = store().collection("states");
	const clientsRef = store().collection("clients");
	const statesCollection = storeCollection(statesRef.orderBy("name"));
	const clientsCollection = storeCollection(clientsRef.orderBy("name"));
	const states = statesCollection.docs.map((d) => ({
		id: d.id,
		...d.data(),
	}));
	const clients = clientsCollection.docs.map((d) => ({
		id: d.id,
		...d.data(),
	}));

	const getTotalCost = (data) =>
		data.length
			? data.map((order) => order.cost).reduce((a, b) => a + b)
			: 0;

	const getOrders = () => {
		const orders = storeCollection(ordersColletion.orderBy("date", "desc")).docs.map((d) => {
			const state = states.find(({ id }) => id === d.data().id_state);
			const client = clients.find(({ id }) => id === d.data().id_client);
			const { id, name, color } = state ? state : { id: "", name: "", color: "" };
			return {
				key: d.id,
				...d.data(),
				client: `${client.name} ${client.description}`,
				state: { id, name, color }
			};
		});
		return orders;
	};

	const [form] = Form.useForm();
	const [data, setData] = useState(getOrders());
	const [stateOrder, setStateOrder] = useState({});
	const [editingKey, setEditingKey] = useState("");
	const [totalCost] = useState(getTotalCost(data));

	const handleChange = (id_state) => {
		// console.log('handleChange');
		// console.log(id_state);
		const { id, name, color } = states.find(({ id }) => id === id_state);
		setStateOrder({ id, name, color });
		// console.log(stateOrder);
	};

	const isEditing = (record) => record.key === editingKey;

	const edit = (record) => {
		form.setFieldsValue({
			...record,
		});
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey("");
	};

	const updateStateOrder = (key, id_state) => {
		ordersColletion.doc(key).update({
			id_state
		});
	 };

	const save = async (key) => {
		try {
			const row = await form.validateFields();
			row.state = stateOrder;
			row.id_state = stateOrder.id;
			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);

			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...row });
				setData(newData);
				setEditingKey("");
				updateStateOrder(key, row.id_state);
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey("");
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const columns = [
		{
			title: "Client",
			dataIndex: "client",
			key: "client",
			editable: true,
		},
		{
			title: "Product",
			dataIndex: "name",
			key: "product",
			// editable: true,
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			// editable: true,
			ellipsis: {
				showTitle: false,
			},
			render: (description) => (
				<Tooltip placement="topLeft" title={description}>
					{description}
				</Tooltip>
			),
		},
		{
			title: "Cost",
			dataIndex: "cost",
			key: "cost",
			width: 80,
		},
		{
			title: "State",
			dataIndex: "state",
			key: "state",
			width: 120,
			editable: true,
			render: (state, record) =>
				state.name ? (
					<span style={{ color: state.color }}>
						{state.name}
						{/* <Button
							disabled={editingKey !== ""}
							onClick={() => edit(record)}
							type="primary"
							shape="circle"
							size="small"
							icon={<EditOutlined style={{ color: "white" }} />}
						/> */}
					</span>
				) : (
						<span> No state 
							{/* <Button
								disabled={editingKey !== ""}
								onClick={() => edit(record)}
								type="primary"
								shape="circle"
								size="small"
								icon={<EditOutlined style={{ color: "white" }} />}
							/> */}
						</span>
					),
		},
		{
			title: "operation",
			dataIndex: "operation",
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<a
							href="//#"
							onClick={() => save(record.key)}
							style={{
								marginRight: 8,
							}}
						>
							Save
						</a>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<a href="//#">Cancel</a>
						</Popconfirm>
					</span>
				) : (
						<a
							href="//#"
							disabled={editingKey !== ""}
							onClick={() => edit(record)}
						>
							Edit
						</a>
					);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === "state" ? "select" : "text",
				states: col.dataIndex === "state" ? states : undefined,
				handleChange,
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				bordered
				dataSource={data}
				columns={mergedColumns}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel,
				}}
				summary={() => {
					return (
						<>
							<Table.Summary.Row>
								<Table.Summary.Cell>Total</Table.Summary.Cell>
								<Table.Summary.Cell>
									<Text type="secondary">{totalCost}$</Text>
								</Table.Summary.Cell>
							</Table.Summary.Row>
						</>
					);
				}}
			/>
		</Form>
	);
};
