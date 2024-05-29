import verifyService from '../services/verify.js';

const verify = async (req, res) => {
  const headers = req.headers;

  try {
    const result = await verifyService.verify(headers);

    const { status, message, data } = result;

    const response = message ? { message } : data;

    res.status(status).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default {
  verify
};
