var moment = require('moment');
var News = require('../models/news');

module.exports = {
  newsList: newsList,
  newsDetails: newsDetails,
  newsAdd: newsAdd,
  newsForm: newsForm,
  newsEdit: newsEdit,
  newsDelete: newsDelete
}

// Show News List
function newsList(req, res) {
  var sort = {
    'created_at': -1
  }
  
  if(req.query.sort) {
    console.log(req.query.sort);
    
    if(req.query.sort == 'created_at')
      sort = {'created_at': -1}
    else if(req.query.sort == 'updated_at')
      sort = {'updated_at': -1}
  }
    
  var id = req.query.sort;
  
  News.find().sort(sort).exec(function(err, docs) {
    if (err) return next(err);
    res.render('index', {newslist: docs, moment: moment});
  });
}

// Show News Details
function newsDetails(req, res) {
  News.findOne({_id: req.params.id}, function(err, docs) {
    if (err) return next(err);
    res.render('news.edit.pug', {item: docs});
  });
}

// Add News Action
function newsAdd(req, res) {
  var news = new News({
    title: req.body.newsTitle,
    content: req.body.newsContent
  });
  
  news.save(function(err, result) {
    if (err) return next(err);
    res.redirect('/'); 
  });
}

// Add/Edit Form
function newsForm(req, res) {
  res.render('news.add.pug');
}

function newsEdit(req, res) {
  var updatedNews = {
    title: req.body.newsTitle,
    content: req.body.newsContent
  }
  
  News.update({_id: req.params.id}, {$set: updatedNews}, {safe: true}, function(err) {
    if (err) return next(err);
    res.redirect('/'); 
   });
}

function newsDelete(req, res) {
  News.remove({_id: req.params.id}, function(err) {
    if (err) return next(err);
  });
  
  res.redirect('/');
}