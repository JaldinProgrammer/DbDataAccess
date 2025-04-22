import pool from '../../database/straightConnection.js';

// GET /api/v2/posts — list all posts
export const getAllPosts = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM "Post" ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// GET /api/v2/posts/:id — get one post
export const getPostById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { rows } = await pool.query(
      'SELECT * FROM "Post" WHERE id = $1',
      [id]
    );
    if (rows.length === 0) 
      return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// POST /api/v2/posts — create a post
export const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO "Post"(title, content, "authorId") 
       VALUES($1, $2, $3) RETURNING *`,
      [title, content || null, authorId || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create post' });
  }
};

// PUT /api/v2/posts/:id — update a post
export const updatePost = async (req, res) => {
  const id = Number(req.params.id);
  const { title, content, authorId } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE "Post" 
       SET title = $1, content = $2, "authorId" = $3 
       WHERE id = $4 
       RETURNING *`,
      [title, content || null, authorId || null, id]
    );
    if (rows.length === 0) 
      return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update post' });
  }
};

// DELETE /api/v2/posts/:id — delete a post
export const deletePost = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await pool.query(
      'DELETE FROM "Post" WHERE id = $1',
      [id]
    );
    if (result.rowCount === 0) 
      return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete post' });
  }
};
