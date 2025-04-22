import prisma from './prismaClient.js';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ include: { author: true, tags: true } });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const post = await prisma.post.findUnique({ where: { id }, include: { author: true, tags: true } });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  const { title, content, authorId, tagIds } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: authorId ? { connect: { id: Number(authorId) } } : undefined,
        tags: tagIds ? { connect: tagIds.map(id => ({ id: Number(id) })) } : undefined
      },
      include: { author: true, tags: true }
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  const id = Number(req.params.id);
  const { title, content, authorId, tagIds } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        author: authorId ? { connect: { id: Number(authorId) } } : { disconnect: true },
        tags: tagIds ? { set: tagIds.map(id => ({ id: Number(id) })) } : undefined
      },
      include: { author: true, tags: true }
    });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.post.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};