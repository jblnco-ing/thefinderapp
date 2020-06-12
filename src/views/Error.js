import React from "react";
import { Result, Button } from "antd";
import { withRouter } from "react-router";

const Error = ({ history }) => {
    const back = () => {
        history.push("/");
    }
    return (
        <Result
            style={{textAlign:"center"}}
            status="404"
            title="404"
            subTitle="Try error message"
            extra={<Button onClick={() => back()} type="primary">Go Back</Button>}
        />
    );
};
export default withRouter(Error);