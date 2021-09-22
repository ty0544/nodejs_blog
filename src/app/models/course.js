const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Course = new Schema(
    {
        _id: {type: Number},
        name: { type: String, required: true },
        description: { type: String, maxlength: 600 },
        image: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String, required: true },
        level: { type: String, required: true },
        deletedAt: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// add plugins
mongoose.plugin(slug);
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('Course', Course);
