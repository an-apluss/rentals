/* eslint-disable linebreak-style */
import bycrpt from 'bcrypt';

const hashPassword = async (plaintext, salt) => {
  const gensalt = await bycrpt.genSalt(salt);
  const password = await bycrpt.hash(plaintext, gensalt);
  return password;
};

const generateId = (data) => {
  const lastId = data[data.length - 1].id;
  const newId = lastId + 1;
  return newId;
};

const generateUserType = (userType) => {
  let type;
  switch (userType.toString().toLowerCase()) {
    case 'admin':
      type = 'admin';
      break;
    case 'staff':
      type = 'staff';
      break;
    case 'false':
      type = 'client';
      break;
    default:
      type = 'unallowed';
      break;
  }
  return type;
};


export { hashPassword, generateId, generateUserType };
