import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },

        quantity: {
            type: Number,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        isBlocked: 
        { type: Boolean,
         default: false },
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.model("product", productSchema);
export default productModel