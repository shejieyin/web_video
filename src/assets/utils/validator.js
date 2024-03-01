let validateMobile = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  } else {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error('手机号格式不正确'));
    } else {
      callback();
    }
  }
};

export {
  validateMobile
}
