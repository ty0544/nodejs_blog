const Course = require('../models/course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] / courses / :slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    //[GET] / course / create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] / courses / store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[GET] /courses/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /courses/handle-store-form-action
    handleStoreFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                {
                    Course.delete({ _id: { $in: req.body.courseId } })
                        .then(() => res.redirect('back'))
                        .catch(next);
                }
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    //[POST] /courses/handle-trash-form-action
    handleTrashFormAction(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                {
                    Course.restore({ _id: { $in: req.body.courseId } })
                        .then(() => res.redirect('back'))
                        .catch(next);
                }
                break;
            // case 'force-delete':
            //     {
            //         Course.delete({ _id: { $in: req.body.courseId } })
            //             .then(() => res.redirect('back'))
            //             .catch(next);
            //     }
            //     break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}

module.exports = new CourseController();
