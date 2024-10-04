import { notification } from 'antd';

const NotificationMessage = {
  success: (message, description) => {
    notification.success({
      message: message || 'Thành công!',
      description: description || 'Thao tác đã được thực hiện thành công.',
    });
  },
  error: (message, description) => {
    notification.error({
      message: message || 'Thất bại!',
      description: description || 'Đã có lỗi xảy ra, vui lòng thử lại.',
    });
  },
  info: (message, description) => {
    notification.info({
      message: message || 'Thông tin!',
      description: description || 'Đây là một thông báo thông tin.',
    });
  },
  warning: (message, description) => {
    notification.warning({
      message: message || 'Cảnh báo!',
      description: description || 'Có vấn đề cần chú ý.',
    });
  },
};

export default NotificationMessage;
