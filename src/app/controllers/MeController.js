const Course =require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class MeController {


    // [Get] /me/stored/courses' trang khoa hoc cua toi (deletedCount Đếm số lượng bỏ vào thùng rác)
    storedCourses(req, res, next) {

        Promise.all([ Course.find({}), Course.countDocumentsDeleted()])
        // đối số kết quả của 2 thằng trên
                .then(([courses, deletedCount]) => 
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses)
                })
                
            ).catch(next);
    }
    // [Get] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
        .then(courses => res.render('me/trash-courses', {
            courses: mutipleMongooseToObject(courses)
        }),
        )
        .catch(next);
    }
}
module.exports = new MeController();

