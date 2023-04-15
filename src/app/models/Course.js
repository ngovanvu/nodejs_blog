const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;
// định nghĩa để lưu dữ liệu khi post
const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    image: {type: String},
    slug: {type: String},
    videoId: {type: String,  required: true},
    level: {type: String},
    slug: { type: String, slug: 'name', unique: true },
    price: {type: String},
    timeCourse:{type: String},
  },{
    timestamps: true,
  })

  // add plugin
  mongoose.plugin(slug);
  Course.plugin(mongooseDelete, {
     deletedAt : true ,
     overrideMethods: 'all' });
  module.exports = mongoose.model('Course', Course);