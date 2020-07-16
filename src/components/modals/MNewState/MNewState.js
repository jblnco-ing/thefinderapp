import React, { useContext, useState } from "react";
import { Form, Modal, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { DatabaseContext } from "../../../contexts/DatabaseContext";
import { ChromePicker } from "react-color";
import "./MNewState.css";

const ColorPicker = ({form}) => {
	const defaultColor = "#999";
	const [color, setColor] = useState({ r: 0, g: 9, b: 153, a: 1 });
	const [changeColor, setChangeColor] = useState("#999");
	const [displayPicker, setDisplayPicker] = useState(false);
	const onHandleShowColorPicker = () => {
        setDisplayPicker(true);
	};
	const onHandleCloseColorPicker = () => {
        setDisplayPicker(false);
    };
	const onChangeColorPicker = (e) => {
		console.log(e);
		setColor(e.rgb);
        setChangeColor(e.hex);
        
        form.setFieldsValue({
            color: e.hex
        });
	};
	return (
		<>
			<span
				onClick={onHandleShowColorPicker}
            >
                ColorPicker
            </span>
			{displayPicker && (
				<div className="color-picker-palette">
					<div
						className="color-picker-cover"
						onClick={onHandleCloseColorPicker}
                        />
					<ChromePicker
                        color={color}
						onChange={onChangeColorPicker}
                        />
				</div>
			)}
		</>
	);
};

export const MNewState = ({ visible, onCancel, useResetFormOnCloseModal }) => {
	const { store } = useContext(DatabaseContext);
	const statesCollection = store().collection("states");
	const [form] = Form.useForm();

	const [loading, setloading] = useState(false);
	useResetFormOnCloseModal({
		form,
		visible,
	});
    
	const onFinish = async (values) => {
        // values.color = changeColor;
		console.log(values);
		// setloading(true);
		// if (values) {
		//     const date = new Date();
		//     const data = {
		//         name: values.name.toUpperCase(),
		//         description: values.description.toUpperCase(),
		//         phone: `(+${values.prefix}) ${values.phone}`,
		//         createdAt: date.toLocaleString(),
		//         updatedAt: date.toLocaleString()
		//     };
		//     // console.log(data);
		//     await statesCollection.doc()
		//         .set(data)
		//         .then((res) => {
		//                 // console.log(res);
		//             },
		//             (error) => {
		//                     console.error(error);
		//                 }
		//             );
		//             setloading(false);
		//             onCancel();
		//         }
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
								required: false,
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
						<Input value={"hola"} />
					</Form.Item>
					<Form.Item
						name="color"
						label="State Color"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        initialValue=""
                    >
                        <ColorPicker form={form}/>
                    </Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};
