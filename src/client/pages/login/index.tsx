import * as React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./login.less";
import { FormComponentProps } from "antd/es/form";

interface UserFormProps extends FormComponentProps {
  age: number;
  name: string;
}

interface LoginMessage {
  username: string;
  password: string;
}

const LoginForm: React.FC = (props: any) => {
  const { getFieldDecorator, validateFields } = props.form;
  const handleSubmit = (): void => {
    validateFields((err: any, values: LoginMessage) => {
      if (!err) {
        console.log("Received values of form: ", res);
      }
    });
  };

  return (
    <div className="login-container">
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Button
            type="primary"
            onClick={handleSubmit}
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const Login = Form.create<UserFormProps>({})(LoginForm);
export default Login;
