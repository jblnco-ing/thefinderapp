import React, { useContext } from 'react'
import { DatabaseContext } from '../../contexts/DatabaseContext';
import { useFirestoreCollection } from 'reactfire';
import { Table } from 'antd';
import Text from 'antd/lib/typography/Text';

export const TableOrders = () => {
    const storeCollection = useFirestoreCollection;
    const { store } = useContext(DatabaseContext);
    const ordersColletion = store().collectionGroup('orders');
    const getOrders = () => {
        const data = storeCollection(ordersColletion).docs
            .map((d) => {
                console.log(d);
                
                return ({
                    key: d.id,
                    ...d.data()
                })
            });
        console.log(data);
        return data;
    }
    const orders = getOrders();
    const columns = [
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client'
        },
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'product'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
    ]
    return (
        <div>
            <Table columns={columns} dataSource={orders} summary={pageData => {
                    let totalCost = 0;

                    pageData.forEach(({ cost }) => {
                        totalCost += cost;
                    });

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
}