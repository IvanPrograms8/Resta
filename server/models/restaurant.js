console.log("inside of restaurant.js");

const mongoose = require("mongoose");
const ReviewSchema = require("./review.js");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Restaurant must have a name!"], 
        minlength: [3, "Restaurant name must be at least 3 characters"],
        maxlength: 255
    },
    cuisine: {
        type: String, 
        required: [true, "Cuisine type is required"], 
        minlength: [3, "Cuisine must be at least 3 characters"], 
        maxlength: 255
    },

    show: {
        type: Boolean
    },

    // description: {
    //     type: String, 
    //     required: [true, "You need to describe the restaurant"], 
    //     minlength: [10, "Description must be at least 10 characters"]
    // },
    reviews: [ReviewSchema],
    avgreview: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

mongoose.model('Restaurant', RestaurantSchema);