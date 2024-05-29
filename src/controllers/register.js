import registerService from '../services/register.js';

const register = async (req, res) => {
  const user = req.body;

  try {
    const result = await registerService.register(user);

    const { status, message } = result;

    res.status(status).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default {
  register
};
