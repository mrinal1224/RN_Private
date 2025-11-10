import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    discountLabel: { type: String, trim: true },
    image: { type: String, trim: true },
    categoryKey: { type: String, required: true, trim: true, lowercase: true },
    categoryName: { type: String, required: true, trim: true },
    categoryIcon: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

productSchema.virtual('discountedPrice').get(function getDiscountedPrice() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return this.price;
  }
  return null;
});

const Product = mongoose.model('Product', productSchema);

export default Product;


