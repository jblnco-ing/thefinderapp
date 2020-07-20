import React, { useContext, useState } from "react";
import { DatabaseContext } from "../../../contexts/DatabaseContext";
import { useFirestoreCollection } from "reactfire";
import { Table, Button, Tooltip } from "antd";
import {EditOutlined} from '@ant-design/icons';
import Text from "antd/lib/typography/Text";

export const TableOrders = () => {
	const storeCollection = useFirestoreCollection;
	const { store } = useContext(DatabaseContext);
	const ordersColletion = store().collectionGroup("orders").orderBy('date',"desc");

	const getTotalCost = (data) =>
		data.length
			? data.map((order) => order.cost).reduce((a, b) => a + b)
			: 0;

	const getOrders = () => {
		const data = storeCollection(ordersColletion).docs.map((d) => {
			// console.log(d);
			return {
				key: d.id,
				...d.data(),
			};
		});
		// console.log(data);
		return data;
	};
	const [orders] = useState(getOrders());
	const [totalCost] = useState(getTotalCost(orders));

	const columns = [
		{
			title: "Client",
			dataIndex: "client",
			key: "client",
		},
		{
			title: "Product",
			dataIndex: "name",
			key: "product",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			ellipsis: {
				showTitle: false,
			},
			render: description => (
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
			render: (state) => state ? <span style={{ color: state.color }}> {state.name} <Button type="primary" shape="circle" icon={<EditOutlined style={{ color: "white" }} />} size='small' /> </span> : <span > No state </span>
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			width: 110,
		},
	];
	return (
		<div>
			<Table
				columns={columns}
				dataSource={orders}
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
		</div>
	);
};
