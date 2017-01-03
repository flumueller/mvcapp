var News = require('../models/news');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/mvcapp');

var news = [
  new News({
    title: 'Lala 1',
    content: '<b>Hello</b>'
  }),
  new News({
    title: 'Lala 2',
    content: '<b>Hello</b>'
  }),
  new News({
    title: 'Lala 3',
    content: '<b>Hello</b>'
  })
]

var done = 0;

for(var i=0; i < news.length; i++) {
  news[i].save(function(err, result) {
    done++;
    if(done === news.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}