import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({ include: { posts: true } });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTagById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const tag = await prisma.tag.findUnique({ where: { id }, include: { posts: true } });
    if (!tag) return res.status(404).json({ error: 'Tag not found' });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTag = async (req, res) => {
  try {
    const tag = await prisma.tag.create({ data: req.body });
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTag = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const tag = await prisma.tag.update({ where: { id }, data: req.body });
    res.json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTag = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.tag.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};