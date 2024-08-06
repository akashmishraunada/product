import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Product } from "../models/Product.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { AddToCart } from "../models/AddToCart.js";

export const createProduct = catchAsyncError(async (req, res, next) => {
    const { name, description, price, category, stock, brand } = req.body;
    const files = req.files;

    const validateProperties = (body) => {
        const missingFields = [];
        if (!body.name) missingFields.push('Product name');
        if (!body.description) missingFields.push('Product description');
        if (!body.price) missingFields.push('Product price');
        if (!body.category) missingFields.push('Product category');
        if (!body.stock) missingFields.push('Product stock');
        if (!body.brand) missingFields.push('Product brand');
        return missingFields;
    };
    const missingFields = validateProperties(req.body);

    if (missingFields.length > 0) {
        return next(new ErrorHandler(`Missing required fields: ${missingFields.join(', ')}`, 400));
    }

    const allowedFileTypes = ['jpg', 'png', 'jpeg', 'avif'];
    for (const file of files) {
        const fileTypeCheck = file.originalname.split('.');
        const fileExtension = fileTypeCheck[fileTypeCheck.length - 1].toLowerCase();
        if (!allowedFileTypes.includes(fileExtension)) {
            return next(new ErrorHandler("Please choose images with jpg, png, jpeg or avif format", 400));
        }
    }
    if (files.length < 1) return next(new ErrorHandler("Please select at least 1 image", 400));

    let cloudImages = [];
    for (const image of files) {
        const fileUri = getDataUri(image);
        try {
            const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
            cloudImages.push({
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            });
        } catch (error) {
            console.error('Error uploading to cloudinary:', error);
            return next(new ErrorHandler('Error uploading images to cloudinary', 500));
        }
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        brand,
        images: cloudImages
    });

    res.status(200).json({
        success: true,
        message: "Product Created Successfully",
        product
    });
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {

    const { Search, DescriptionSearch, page = 1, limit = 10 } = req.query;

    let query = {};
    let sortOption = { createdAt: -1 };

    if (Search || DescriptionSearch) {
        const orConditions = [];

        if (Search) {
            const searchQuery = { $regex: Search, $options: "i" };
            orConditions.push({ name: searchQuery });
        }

        if (DescriptionSearch) {
            const descriptionSearch = { $regex: DescriptionSearch, $options: "i" };
            orConditions.push({ description: descriptionSearch });
        }

        if (orConditions.length > 0) {
            query.$or = orConditions;
        }
    }

    const validPage = Math.max(1, parseInt(page, 10));
    const validLimit = Math.max(1, parseInt(limit, 10));
    const skip = (validPage - 1) * validLimit;

    const Products = await Product.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(validLimit);

    res.status(200).json({
        success: true,
        message: "All Products Get successfully",
        pagination: {
            currentPage: validPage,
            pageSize: validLimit,
            totalItems: await Product.countDocuments(query),
        },
        Products
    });
});

export const addToCart = catchAsyncError(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const { _id } = req.user;

    const product = await Product.findById(productId);
    if (!product) return next(new ErrorHandler("product Not Found", 400));

    const addToCart = await AddToCart.create({
        userId: _id,
        productId,
        quantity
    });

    res.status(200).json({
        success: true,
        message: "Product Added to Cart Successfully",
        addToCart
    });
});

export const updateCartItem = catchAsyncError(async (req, res, next) => {
    const { cartId, quantity } = req.body;

    const cart = await AddToCart.findById(cartId);
    if (!cart) {
        return next(new ErrorHandler("Item not found in cart", 404));
    }

    cart.quantity = quantity;
    await cart.save();

    res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart
    });
});

export const deleteCartItem = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const cart = await AddToCart.findById(id);
    if (!cart) {
        return next(new ErrorHandler("Item not found in cart", 404));
    }

    await cart.deleteOne();

    res.status(200).json({
        success: true,
        message: "Cart item deleted successfully",
        cart
    });
});

export const deleteALLCartItems = catchAsyncError(async (req, res, next) => {
    const { _id } = req.user;

    const cart = await AddToCart.deleteMany({ userId: _id });

    if (cart.deletedCount === 0) {
        return next(new ErrorHandler("Items not found in cart", 404));
    }

    res.status(200).json({
        success: true,
        message: "All items deleted from cart successfully",
        deletedCount: cart.deletedCount
    });
});


export const getAllCartItem = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;

    const cartItems = await AddToCart.find({ userId })
        .populate('productId')

    res.status(200).json({
        success: true,
        message: "Cart item Get successfully",
        cartItems
    });
});
