import React, { useContext, useState } from 'react'
import { Form, Modal, Input, Select, Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { DatabaseContext } from '../../../contexts/DatabaseContext';

export const MNewClient = ({ visible, onCancel, useResetFormOnCloseModal }) => {
    const { Option } = Select;
    const { store } = useContext(DatabaseContext);
    const clientsCollection = store().collection("clients"); 
    const [form] = Form.useForm();
    const [loading, setloading] = useState(false);        
    useResetFormOnCloseModal({
        form,
        visible,
    });

    const onFinish = async (values) => {
        setloading(true);
        if (values) {
            const date = new Date();
            const data = {
                name: values.name.toUpperCase(),
                description: values.description.toUpperCase(),
                phone: `(+${values.prefix}) ${values.phone}`,
                createdAt: date.toLocaleString(),
                updatedAt: date.toLocaleString()
            };
            // console.log(data);
            await clientsCollection.doc()
                .set(data)
                .then((res) => {
                        // console.log(res);
                    },
                    (error) => {
                            console.error(error);
                        }
                    );
                    setloading(false);
                    onCancel();
                }
            }

    const onOk = () => {
        form.submit();
    };
    
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }} >
                <Option value="58">+58</Option>
            </Select>
        </Form.Item>
    );
    const antIcon = <LoadingOutlined style={{ color: "@primary-color" }} spin />;
    return (
        <Modal title="New Client" visible={visible} onOk={onOk} onCancel={onCancel}>
            <Spin spinning={loading} size="large" indicator={antIcon}>
                <Form
                    form={form}
                    layout="vertical"
                    name="newClientForm"
                    initialValues={{
                        prefix: '58',
                    }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="name"
                        label="Client Name"
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
                        label="Client description"
                        initialValue=""
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Client Phone"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        >
                        <Input addonBefore={prefixSelector} />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
}