const Joi = require('joi')
const Category = require('../../../models/category')

module.exports = {
    async homeCategory(req, res) {
        const categories = await Category.find()
        res.render('admin/categories', {
            title: 'Categories page',
            layout: '../admin/layouts/main',
            categories
        })
    },
    async updateCategory(req, res) {
        try {
            const category = await Category.findById(req.params.id);

            res.render('admin/updateCategory', {
                title: category.name,
                layout: '../admin/layouts/main',
                category
            })
        } catch (error) {
            res.redirect('/404')
        }
    }
    ,
    async deleteCategory(req, res) {
        const id = req.params.id;

        try {
            await Category.findByIdAndDelete(id);
            res.redirect('/api/category/')
        } catch (error) {
            res.redirect('/404')
        }
    }
    ,
    async updateCategoryPost(req, res) {
        try {
            const category = await Category.findById(req.body.id);
            if (req.file) {
                req.body.img = "/uploads/category/" + req.file.filename
            }
            await Category.findByIdAndUpdate(req.body.id, req.body);
            res.redirect('/api/category')
        } catch (error) {
            res.redirect('/404')
        }
    }
    ,
    async getOneCategory(req, res) {
        try {
            const category = await Category.findById(req.params.id).select({ __v: 0 });

            res.render('admin/viewCategory', {
                title: category.title,
                category,
                layout: '../admin/layouts/main'
            })
        } catch (error) {
            res.redirect('/404')
        }
    }
    ,
    async addCategory(req, res) {
        if (req.file) {
            req.body.img = "/uploads/category/" + req.file.filename
        }

        const error = validateCategory(req.body)

        if (!!error) {
            res.status(400).send(error.message)
            return
        }

        const category = new Category({
            name: req.body.name,
            img: req.body.img
        })

        await category.save()

        res.redirect('/api/category')
    },
    async getAddCategory(req, res) {
        res.render('admin/addCategory', {
            title: 'Add category',
            layout: '../admin/layouts/main'
        })
    }
}

function validateCategory(val) {
    const schema = Joi.object({
        name: Joi.string().required(),
        img: Joi.string().required()
    })

    const res = schema.validate(val)

    return res.error
}