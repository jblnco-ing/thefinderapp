import React, { useState, useEffect } from 'react'
import { Layout } from "antd";
import { Form, Button } from "antd";
import { withRouter } from "react-router";
// import Errores from '../components/Errores'
import { useAuth, useUser} from 'reactfire';
import { Errors } from '../components/Errores';
import { Footer } from '../components/Footer';

const Login = ({ history }) => {
    console.log(useUser());
    const user = useUser();
    const auth = useAuth();
    const googleAuthProvider = new useAuth.GoogleAuthProvider();
    const [error, seterror] = useState('');
    const { Content} = Layout;
    
    useEffect(() => {
           
        if (user) {
            console.log(user);
            
            history.push("/");
        }
        
    }, [history, user])

    const googleLogin = async (provider) => {
        await auth
            .signInWithPopup(provider)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                seterror(error.message)
            });
    }
    return (
        <Layout style={{ height: "100vh" }}>
            <Content
                style={{
                    padding: "0 50px",
                    marginTop: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}
            >
                <div
                    style={{
                        background: "#fff",
                        padding: 24,
                        height: 450,
                        width: 400,
                        textAlign: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex"
                    }}
                >
                    <Form className="login-form">
                        <Form.Item>
                            <h1>Ingresa</h1>
                        </Form.Item>
                        {error ? <Form.Item>
                            <Errors message={error} />
                        </Form.Item> : null}
                        <Form.Item>
                            <Button
                                type="danger"
                                htmlType="button"
                                className="login-form-button"
                                style={{ marginRight: 10 }}
                                onClick={() => googleLogin(googleAuthProvider)}
                            >
                                GOOGLE
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Content>
            <Footer />
        </Layout>
    )
}
export default withRouter(Login);