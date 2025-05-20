import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class LoginInfoDocument extends Document {

    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        unique: true,
        required: true
    })
    user: Types.ObjectId | User;

    @Prop()
    refreshToken: string;
}

export const LoginInfoSchema = SchemaFactory.createForClass(LoginInfoDocument);