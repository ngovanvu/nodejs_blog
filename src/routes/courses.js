// CoursesRouter

var express = require('express');
const { mongo } = require('mongoose');
var router = express.Router();

const courseController = require('../app/controllers/CourseController');

// newsController.index
router.get('/create', courseController.create);
router.post('/store', courseController.store); // khi nhấn nút tạo
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions); // nút thực hiện
router.put('/:id', courseController.update); // nhấn nút lưu lại dạng put
router.patch('/:id/restore', courseController.restore);// Khôi phục
router.delete('/:id', courseController.destroy); // Xóa Nhưng vẫn để lại dữ liệu trong mongodb
router.delete('/:id/force', courseController.forcedestroy);// xóa dữ liệu trong mongodb
router.get('/:slug', courseController.show); // courses detail

module.exports = router;
