import React, { useContext } from 'react'
import { Form, Modal, Input, Select } from 'antd';
import { DatabaseContext } from '../../../contexts/DatabaseContext';

export const MNewClient = ({ visible, onCancel, useResetFormOnCloseModal }) => {
    const { Option } = Select;
    const { store } = useContext(DatabaseContext);
    const clientsCollection = store().collection("clients"); 
    const [form] = Form.useForm();
        
    useResetFormOnCloseModal({
        form,
        visible,
    });

    const onFinish = async (values) => {
        if (values) {
            const date = new Date();
            const data = {
                name: values.name.toUpperCase(),
                lastname: values.lastname.toUpperCase(),
                phone: `(+${values.prefix}) ${values.phone}`,
                createdAt: date.toLocaleString(),
                updatedAt: date.toLocaleString()
            };
            console.log(data);
            const newClient = await clientsCollection.doc()
                .set(data)
                .then((res) => {
                    console.log(res);
                },
                (error) => {
                    console.error(error);
                }
            );
            console.log(newClient);
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
    return (
        <Modal title="New Client" visible={visible} onOk={onOk} onCancel={onCancel}>
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
                    name="lastname"
                    label="Client Lastname"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
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
        </Modal>
    );
}