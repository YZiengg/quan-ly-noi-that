import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { createProduct, getProductByCategory } from '../../../../api/API_Product';
import { uploadImages } from '../../../../api/API_Upload';
import NotificationMessage from '../../../Message/NotificationMessage';
const CreateProduct = ({ categoryId }) => { // Nhận categoryId và onClose như props
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleUpload = async (file) => {
    try {
      const urls = await uploadImages(file);
      setImageUrls((prevUrls) => [...prevUrls, ...urls]);
      NotificationMessage.success('Upload ảnh thành công!');
    } catch (error) {
      NotificationMessage.error('Upload ảnh thất bại!');
    }
  };

  const onFinish = async (values) => {
    if (imageUrls.length === 0) {
      NotificationMessage.error('Ảnh chưa được tải lên!!!');
      return;
    }

    const productData = {
      ...values,
      category_id: categoryId,
      images: imageUrls.map(url => ({ url })),
    };

    console.log(productData)
    try {
      const result = await createProduct(dispatch, categoryId, productData);
      if (result.success) {
        NotificationMessage.success('Tạo sản phẩm thành công!');
        form.resetFields();
        setFileList([]);
        setImageUrls([]);
        await getProductByCategory(dispatch,categoryId);
      } else {
        NotificationMessage.error('Tạo sản phẩm thất bại!', result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="product_id" label="Mã sản phẩm" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="product_name" label="Tên sản phẩm" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Giới thiệu">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="brand" label="Nhãn hàng" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="quantity" label="Kho" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="productType" label="Loại sản phẩm" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      {/* Upload ảnh */}
      <Form.Item label="Tải ảnh lên">
        <Upload
          customRequest={({ file }) => handleUpload(file)}
          listType="picture"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tạo sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProduct;
