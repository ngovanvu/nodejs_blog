const Course =require('../models/Course')
const {mongooseToObject} = require('../../util/mongoose');

class CourseController {
    // [Get] /courses/:slug
    show(req, res, next) {
        //req.params.slug lấy được slug
        Course.findOne({slug: req.params.slug}) //findOne tìm một bản ghi trong database
        .then(course => 
            res.render('courses/show',{course: mongooseToObject(course)})
        )
        .catch(next);
    }

    // [Get] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }
    // [POST] /courses/store Bấm nút tạo khóa học
    store(req, res, next) {
    //  res.json(req.body) // lấy ra dữ liệu mà chúng ta post lên formdata(giống như database)
    req.body.image  =  `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
    const course = new Course(req.body); // lấy ra giá trị khi bên html nhập và post về ở đây(chứa document chúng ta muốn tạo)
    course.save() // lưu lại trong database
    .then(() => res.redirect('/me/stored/courses'))
    .catch(error => {
        
    })
    }
    //-----Edit-----
      // [POST] /courses/:id/store
    edit(req, res, next) {
        Course.findById(req.params.id) // lấy ra id
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course) // tải  giá trị từ value ở database rồi hiện lên ở bên edit.hbs
            }))
            .catch(next);
        
    }
    // [PUT] /courses/:id
    update(req, res, next) { // giống bên tạo khóa học update từng khóa học
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    //-----End Edit-----

     // [Delete] /courses/:id
    destroy(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
     // [Delete] /courses/:id/force
     forcedestroy(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[Patch] '/courses/:id/restore Khôi phục
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    } 
    //[POST] /courses/handle-form-actions nút thực hiện
    handleFormActions(req, res, next) {
       switch(req.body.action){
        case 'delete':
            Course.delete({_id: { $in: req.body.courseIds }})
            .then(() => res.redirect('back'))
            .catch(next);
            break;
        default:
            res.json({message: 'Action is invalid!!'})
       }
    }  

   
}
module.exports = new CourseController();
