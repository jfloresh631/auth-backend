import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const login = async (user) => {
  const { email, password } = user;

  if (!email || !password) {
    return {
      status: 400,
      message: 'Email or password are required'
    };
  }

  const sql = 'SELECT * FROM users WHERE email = ?';

  let connection;

  try {
    connection = await pool.getConnection();

    const [ rows ] = await connection.query(sql, email);

    if (!rows.length) {
      return {
        status: 401,
        message: 'Email or password are incorrect'
      };
    }

    const hash = rows[0].password;

    const result = await bcrypt.compare(password, hash);

    if (!result) {
      return {
        status: 401,
        message: 'Email or password are incorrect'
      };
    }

    const data = { name: rows[0].name };

    const token = jwt.sign({ data }, process.env.SECRET, {
      expiresIn: '10m'
    });

    return {
      status: 200,
      token
    };
  } catch (error) {
    throw new Error('Login error');
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export default {
  login
};
