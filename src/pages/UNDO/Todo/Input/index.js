import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { ReducerContext } from '../../index';
const TodoInput = () => {
    const [form] = Form.useForm();
    const { dispath } = useContext(ReducerContext)

    const onFinish = (values) => {
        dispath({ type: 'ADD', payload: { id: new Date().getTime(), context: values, forget: false } })
        form.resetFields()
    };

    return (
        <Form
            name="basic"
            form={ form }
            onFinish={ onFinish }
            autoComplete="off"
            layout="inline"
        >
            <Form.Item name="firstName">
                <Input placeholder='firstName' />
            </Form.Item>
            <Form.Item name="sencondName">
                <Input placeholder='sencondName' />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default TodoInput