import jwt from 'jsonwebtoken';

const verify = async (headers) => {
  const { authorization } = headers;

  if (!authorization) {
    return {
      status: 400,
      message: 'Authorization is required'
    };
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return {
      status: 400,
      message: 'Token is required'
    };
  }

  try {
    const { data } = jwt.verify(token, process.env.SECRET);

    return {
      status: 200,
      data
    };
  } catch (error) {
    throw new Error('Token is invalid');
  }
}

export default {
  verify
};
