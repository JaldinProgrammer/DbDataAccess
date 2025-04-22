import pool from '../../database/straightConnection.js';

// GET /api/v2/tags — list all tags
export const getAllTags = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM "Tag" ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
};

// GET /api/v2/tags/:id — get one tag
export const getTagById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { rows } = await pool.query(
      'SELECT * FROM "Tag" WHERE id = $1',
      [id]
    );
    if (rows.length === 0) 
      return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
};

// POST /api/v2/tags — create a tag
export const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO "Tag"(name) VALUES($1) RETURNING *',
      [name]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create tag' });
  }
};

// PUT /api/v2/tags/:id — update a tag
export const updateTag = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE "Tag" SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (rows.length === 0) 
      return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update tag' });
  }
};

// DELETE /api/v2/tags/:id — delete a tag
export const deleteTag = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await pool.query(
      'DELETE FROM "Tag" WHERE id = $1',
      [id]
    );
    if (result.rowCount === 0) 
      return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete tag' });
  }
};
