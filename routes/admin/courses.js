const express = require('express');
const router = express.Router();
const courses = require('../../controllers/admin/courses/index');
const upload = require('../../middleware/uploadCourses')

router.get('/', courses.homeCourses)

router.get('/add', courses.getAddCourses)

router.get('/delete/:id', courses.deleteCourse)

router.get('/update/:id', courses.updateCourse)

router.post('/update/', upload.single('img'), courses.updateCoursePost)

router.get('/:id', courses.getOneCourse)

router.post('/add', upload.single('img'), courses.addCourse)

module.exports = router 