import { useEffect } from 'react';
import { Button, Card, Form, Input, Radio, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import SingleUpload from "../../../components/SingleUpload";
import { Admin } from '../../../api/index';

function Edit() {
    //获取路由参数
    let { id } = useParams();
    //获取Form实例
    let [form] = Form.useForm();
    //加载管理员数据
    useEffect(() => {
        async function loadInfo() {
            let { status, data } = await Admin.info({ id });
            if (status) {
                //填充表单数据
                form.setFieldsValue(data);
            }
        }

        loadInfo();
    }, [id, form])

    // 获取路由
    let navigate = useNavigate();
    //编辑资料
    const handleEdit = async (values) => {
        let { status, msg } = await Admin.edit({ id, ...values });
        if (status) {
            // 消息提示
            message.success(msg);
            // 跳转路由
            navigate(-1, { replace: true });
        } else {
            message.error(msg);
        }
    }

    return (
        <Card title="编辑管理员">
            <Form onFinish={ handleEdit } form={ form } labelCol={ { span: 2 } } wrapperCol={ { span: 22 } }>
                <Form.Item label="用户名" name="username"
                           rules={ [
                               { required: true, message: '请输入用户名称！' },
                               { type: 'string', min: 3, message: '请输入至少3个字符！' }
                           ] }>
                    <Input disabled/>
                </Form.Item>
                <Form.Item label="姓名" name="fullname"
                           rules={ [
                               { required: true, message: '请输入您的姓名！' },
                               { type: 'string', min: 2, message: '请输入至少2个字符！' }
                           ] }>
                    <Input/>
                </Form.Item>
                <Form.Item label="性别" name="sex"
                           rules={ [{ required: true, message: '请选择性别！' }] }>
                    <Radio.Group>
                        <Radio value="男">男</Radio>
                        <Radio value="女">女</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="手机" name="tel"
                           rules={ [
                               { required: true, message: '请输入手机号码！' },
                               { pattern: /^1[3456789]\d{9}$/, message: '请输入11位手机号码！' }
                           ] }>
                    <Input/>
                </Form.Item>
                <Form.Item label="邮箱" name="email"
                           rules={ [
                               { required: true, message: '请输入电子邮件地址！' },
                               {
                                   pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                   message: '请输入合法的电子邮件地址！'
                               }
                           ] }>
                    <Input/>
                </Form.Item>
                <Form.Item label="头像" name="avatar" rules={ [{ required: true, message: '请选择上传一张头像！' }] }>
                    <SingleUpload action="/upload/common/"/>
                </Form.Item>
                <Form.Item wrapperCol={ { offset: 2, span: 22 } }>
                    <Button type="primary" htmlType="submit">
                        保存修改
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit;
