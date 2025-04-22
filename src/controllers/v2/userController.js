import pool from '../../database/straightConnection.js';

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "User" u LEFT JOIN "Post" p ON u.id = p."authorId"');
    const { rows } = result;
    console.log(result);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await pool.query(
      'SELECT * FROM "User" WHERE id = $1',
      [id]
    );
    console.log(result);
    const { rows } = result;
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO "User"(name, email) VALUES($1, $2)',
      [name, email]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE "User" SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await pool.query(
      'DELETE FROM "User" WHERE id = $1',
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete user' });
  }
};
