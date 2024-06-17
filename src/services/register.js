import bcrypt from 'bcryptjs';
import pool from '../db.js';

const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    return {
      status: 400,
      message: 'Name, email or password are required'
    };
  }

  const sql = [
    'SELECT id FROM users WHERE email = ?',
    'INSERT INTO users SET ?'
  ];

  let connection;

  try {
    connection = await pool.getConnection();

    const [ rows ] = await connection.query(sql[0], email);

    if (rows.length) {
      return {
        status: 400,
        message: 'Email is already registered'
      };
    }

    await connection.query(sql[1], {
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });

    return {
      status: 200,
      message: 'Registered successfully'
    };
  } catch (error) {
    throw new Error('Registration error');
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export default {
  register
};
