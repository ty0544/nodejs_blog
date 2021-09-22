const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_course_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
        });

        console.log('Connect Suscessfully!');
    } catch (error) {
        console.log('Connect Fail!');
    }
}

module.exports = { connect };
