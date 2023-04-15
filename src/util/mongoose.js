module.exports = {
    //lấy ra 1 list
    mutipleMongooseToObject: function(mongooseArrays){
        return mongooseArrays.map(mongoose =>mongoose.toObject())
    },
    // từng cái 1 
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose
    },
}
