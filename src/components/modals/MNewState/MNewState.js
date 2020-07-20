import React, { useContext, useState } from "react";
import { Form, Modal, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { DatabaseContext } from "../../../contexts/DatabaseContext";
import { ColorPicker } from "../../ColorPicker/ColorPicker";

export const MNewState = ({ visible, onCancel, useResetFormOnCloseModal }) => {
	const { store } = useContext(DatabaseContext);
	const statesCollection = store().collection("states");
	const [form] = Form.useForm();
	const [displayPicker, setDisplayPicker] = useState(false);

	const [loading, setloading] = useState(false);
	useResetFormOnCloseModal({
		form,
		visible,
	});

	const onHandleShowColorPicker = () => {
		setDisplayPicker(true);
	};
	const onHandleCloseColorPicker = () => {
		setDisplayPicker(false);
	};
    
	const onFinish = async (values) => {
        // values.color = changeColor;
		// console.log(values);
		setloading(true);
		if (values) {
		    const date = new Date();
		    const data = {
		        ...values,
		        createdAt: date.toLocaleString(),
		        updatedAt: date.toLocaleString()
		    };
		    // console.log(data);
		    await statesCollection.doc()
		        .set(data)
		        .then(() => {
		                // console.log(res);
		            },
		            (error) => {
		                    console.error(error);
		                }
		            );
		            setloading(false);
		            onCancel();
		        }
	};

	const onOk = () => {
		form.submit();
	};

	const antIcon = (
		<LoadingOutlined style={{ color: "@primary-color" }} spin />
	);
	return (
		<Modal
			title="New State"
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
		>
			<Spin spinning={loading} size="large" indicator={antIcon}>
				<Form
					form={form}
					layout="vertical"
					name="newStateForm"
					onFinish={onFinish}
				>
					<Form.Item
						name="name"
						label="State Name"
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
						label="State Description"
						// initialValue=""
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="color"
						label="State Color"
						className=""
                        rules={[
							{
								required: true,
                            },
                        ]}
                    >
						<Input readOnly onClick={onHandleShowColorPicker} />
                    </Form.Item>
				</Form>
				<ColorPicker form={form} display={displayPicker} onHandleCloseColorPicker={onHandleCloseColorPicker}/>
			</Spin>
		</Modal>
	);
};
