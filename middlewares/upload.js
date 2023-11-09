import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';

const destination = path.resolve('temp');

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const filename = `${nanoid()}_${file.originalname}`;
        cb(null, filename)
    }
})

const limits = {
    fileSize: 5 * 1024 * 1024
}

const fileFilter = (req, file, cb) => {
    if (file.originalname.split('.').pop() === 'exe') {
        cb(new Error('File extention not allow'))
    }
    cb(null, true);
}

const upload = multer({
    storage,
    limits
})

export default upload;