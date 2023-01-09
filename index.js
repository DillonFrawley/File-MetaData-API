var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' }).single("upfile");

var app = express();


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", (req,res) => {
  upload(req,res,(err) => {
    if (err) return console.log(err);
    let responseObject = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    }
    res.send(responseObject);
  });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
