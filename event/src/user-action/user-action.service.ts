import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserActionModel } from '../user-action/schemas/user-action-log.schema';
import { UserActionType } from '../user-action/constants/user-action.enum';

@Injectable()
export class UserActionService {

    constructor(
        @InjectModel('UserAction') private userActionModel: Model<UserActionModel>,
    ) { }

    async do(type: UserActionType, userId: string, metadata: Record<string, any>): Promise<UserActionModel> {
        const created = new this.userActionModel({ type: type, userId: userId, metadata: metadata });
        return await created.save();
    }

    async findAllByUserId(userId: string): Promise<UserActionModel[]> {
        return await this.userActionModel.find({ userId: userId });
    }
}
