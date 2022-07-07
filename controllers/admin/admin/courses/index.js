const Joi = require('joi')
const Courses = require('../../../models/Courses');

module.exports = {
    async homeCourses(req, res) {
        const courses = await Courses.find();
        res.render('admin/courses', {
            title: 'Courses page',
            layout: '../admin/layouts/main',
            courses
        })
    },
    async getOneCourse(req, res) {
        const course = await Courses.findById(req.params.id);

        res.render('admin/viewCourse', {
            title: course.title,
            layout: '../admin/layouts/main',
            course
        })
    }
    ,
    async addCourse(req, res) {
        if (req.file) {
            req.body.img = "/uploads/course/" + req.file.filename
        }

        const error = validateCourses(req.body)

        if (!!error) {
            res.status(400).send(error.message)
            return
        }

        const courses = new Courses({
            title: req.body.title,
            img: req.body.img,
            price: req.body.price,
            description: req.body.description,
            author: req.body.author,
            language: req.body.language
        })

        await courses.save()

        res.redirect('/api/courses')
    },
    async updateCoursePost(req, res) {
        try {
            const course = await Courses.findById(req.body.id);
            if (req.file) {
                req.body.img = "/uploads/course/" + req.file.filename
            }
            await Courses.findByIdAndUpdate(req.body.id, req.body);
            res.redirect('/api/courses')
        } catch (error) {
            res.redirect('/404')
        }
    }
    ,
    async deleteCourse(req, res) {
        const id = req.params.id;

        try {
            await Courses.findByIdAndDelete(id);
            res.redirect('/api/courses/')
        } catch (error) {
            res.redirect('/404')
        }
    },
    async updateCourse(req, res) {
        try {
            const course = await Courses.findById(req.params.id);

            res.render('admin/updateCourse', {
                title: course.title,
                layout: '../admin/layouts/main',
                course
            })
        } catch (error) {
            res.redirect('/404')
        }
    },
    async getAddCourses(req, res) {
        res.render('admin/addCourse', {
            title: 'Add courses',
            layout: '../admin/layouts/main'
        })
    }
}

function validateCourses(val) {
    const schema = Joi.object({
        title: Joi.string().required(),
        img: Joi.string().required(),
        price: Joi.string().required(),
        description: Joi.string().required(),
        author: Joi.string().required(),
        language: Joi.string(),
    })

    const res = schema.validate(val)

    return res.error
}