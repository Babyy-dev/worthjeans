import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.resolve(process.cwd(), 'backend', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    import('crypto').then(({ randomUUID }) => cb(null, `${randomUUID()}${path.extname(file.originalname)}`));
  },
});

export const uploader = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error('Invalid file type'));
    cb(null, true);
  },
});

export const UploadController = {
  async single(req: Request, res: Response) {
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}`;
    const fileName = (req.file as Express.Multer.File).filename;
    const publicUrl = `${baseUrl}/uploads/${fileName}`;
    res.status(201).json({ url: publicUrl });
  }
};
