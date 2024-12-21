import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  stock: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
