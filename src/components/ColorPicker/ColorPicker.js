import React, { useState } from 'react';
import { CirclePicker as ChromePicker } from "react-color";
import './ColorPicker.css';

export const ColorPicker = ({ form, display = false, onHandleCloseColorPicker }) => {
    const [color, setColor] = useState({ r: 0, g: 9, b: 153, a: 1 });
    const onChangeColorPicker = (e) => {
        // console.log(e);
        setColor(e.rgb);
        form.setFieldsValue({
            color: e.hex
        });
        onHandleCloseColorPicker();
    };
    return (
        <>
            {display && (
                <div className="color-picker-palette">
                    <div
                        className="color-picker-cover"
                        onClick={onHandleCloseColorPicker}
                    />
                    <ChromePicker
                        styles={{ backgroundColor: "#F7E9D4"}}
                        color={color}
                        onChange={onChangeColorPicker}
                    />
                </div>
            )}
        </>
    );
}
