const mongoose = require('mongoose');

mongoose.connect('mongodb + srv://ckramesh0006:Ramesh6453@cluster0.iqdk9lt.mongodb.net/alphawallet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
