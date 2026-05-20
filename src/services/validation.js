export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^0[0-9]{9}$/;
  return phoneRegex.test(phone);
};
