const { Router } = require('express')
const router = Router()
const categories = require('../../controllers/admin/categories/index.js')
const upload = require('../../middleware/uploadCategory')

router.get('/', categories.homeCategory)

router.get('/add', categories.getAddCategory)

router.get('/delete/:id', categories.deleteCategory)

router.post('/add', upload.single('img'), categories.addCategory)

router.get('/:id', categories.getOneCategory)

router.get('/update/:id', categories.updateCategory)

router.post('/update/', upload.single('img'), categories.updateCategoryPost)

module.exports = router