var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true }, function(err, client) {
  if (err) {
    console.log(err);
  }
  console.log('connect!!!');
});
var UserDataSchema = mongoose.Schema({
  title: {type:String, require: true},
  content: String,
  author: String
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', UserDataSchema )

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  UserData.find()
  .then(function(doc){
    res.render('index', {items: doc});
  })
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new UserData(item);
  data.save();  
});

router.post('/update', function(req, res, next) {

  var id = req.body.id;
  UserData.findById(id, function(err, doc){
  if(err){
    console.log('error, no entry found')
}
  doc.title = req.body.title;
  doc.content = req.body.content;
  doc.author = req.body.author;
  doc.save();
  });
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
