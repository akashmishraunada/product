import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const AddToCart = mongoose.model('AddToCart', addToCartSchema);
