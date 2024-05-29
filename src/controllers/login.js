import loginService from '../services/login.js';

const login = async (req, res) => {
  const user = req.body;

  try {
    const result = await loginService.login(user);

    const { status, message, token } = result;

    const response = message ? { message } : { token };

    res.status(status).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default {
  login
};
