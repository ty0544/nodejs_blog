const express = require('express');
const   router = express.Router();

const courseController = require('../app/controllers/CourseController.js');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-store-form-action', courseController.handleStoreFormAction);
router.post('/handle-trash-form-action', courseController.handleTrashFormAction);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);

module.exports = router;