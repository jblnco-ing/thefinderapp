import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, Select, Row, Col } from 'antd';
import { MNewClient } from '../modals/MNewClient/MNewClient';

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
    }, [visible]);
};

export const NewOrder = () => {
    const [visible, setVisible] = useState(false);
    const [client_id, setclient_id] = useState(0);
    const handleChange = value => {
        setclient_id(value);
    }
    
    const showUserModal = () => {
        setVisible(true);
    };
    
    const hideUserModal = () => {
        setVisible(false);
    };

    const onFinish = values => {
        values.client_id=client_id;
        console.log('Finish:', values);
    };
    
    return (
        <div>
            <Form.Provider
                onFormFinish={(name, { values, forms }) => {
                    if (name === 'newClientForm') {
                        console.log(values);
                        
                        const { newOrderForm } = forms;
                        const client = newOrderForm.getFieldValue('client') || [];
                        newOrderForm.setFieldsValue({
                            client: [...client, values],
                        });
                        setVisible(false);
                    }
                }}
                >
                <Form
                    {...layout}
                    name="newOrderForm"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Client"
                    >
                    <Row>
                        <Col span={12}>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, curValues) => prevValues.client !== curValues.client}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                                >
                                {({ getFieldValue }) => {
                                        const client = getFieldValue('client') || [];
                                        const options = (client) => 
                                            client.length ?
                                                client.map((user, index) => <Option key={index} value={index}>{user.name}</Option>)
                                                : (<Option value="0">No Client</Option>)
                                        ;
                                        // console.log(options(client));
                                        
                                    return (
                                        <Select
                                            onChange={handleChange}
                                        >
                                            {options(client)}
                                        </Select>
                                    );
                                }}
                            </Form.Item>
                            </Col>
                            <Col>
                                <Button
                                    htmlType="button"
                                    style={{
                                        margin: '0 8px',
                                    }}
                                    onClick={showUserModal}
                                    >
                                    Add Client
                                </Button>
                            </Col>
                        </Row>
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
                <MNewClient visible={visible} onCancel={hideUserModal} useResetFormOnCloseModal={useResetFormOnCloseModal} />
            </Form.Provider>
        </div>
    );
};