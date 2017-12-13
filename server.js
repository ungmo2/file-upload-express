/*  DEPENDENCIES */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5500;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Setup File upload */
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'avatars/');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

/* ROUTERS */
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log('UPLOAD SUCCESS!', req.file);
  res.json({ success: true, file: req.file });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
