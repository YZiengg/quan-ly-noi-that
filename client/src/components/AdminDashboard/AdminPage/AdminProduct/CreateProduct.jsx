import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getProducts,createProduct } from '../../../../api/API_Product';
import { uploadImages } from '../../../../api/API_Upload';
const CreateProduct = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // Danh sách file đã upload
  const [imageUrls, setImageUrls] = useState([]); // Danh sách URL hình ảnh

  // Hàm upload hình ảnh
  const handleUpload = async (file) => {
    try {
      const urls = await uploadImages(file);
      setImageUrls((prevUrls) => [...prevUrls, ...urls]); // Thêm các URL đã upload vào danh sách
      message.success('Upload ảnh thành công!');
    } catch (error) {
      message.error('Upload ảnh thất bại!');
    }
  };

  const onFinish = async (values) => {

    if (imageUrls.length === 0) {
      message.error('Ảnh chưa được tải lên!!!');
      return; // Dừng quá trình nếu chưa có ảnh
    }
  
    console.log('Form data:', values);
    
    // Đảm bảo imageUrls được cập nhật trước khi tạo danh mục
    const productData = {
      ...values,
      images: imageUrls.map(url => ({ url })) // Thêm URL hình ảnh vào dữ liệu danh mục
    };

    try {
      
      const result = await createProduct(dispatch, productData);

      if (result.success) {
        message.success('Tạo danh mục thành công!');
        form.resetFields(); // Reset form
        setFileList([]); // Xóa danh sách file đã upload
        setImageUrls([]); // Xóa danh sách URL hình ảnh
        getProducts(dispatch);
      } else {
        message.error('Tạo danh mục thất bại!', result.error);
      }
    } catch (error) {
      message.error('Lỗi khi tạo danh mục!');
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
