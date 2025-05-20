import { Connection } from "mongoose";

export function Transactional() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const connection: Connection = this.connection;
            const session = await connection.startSession();
            session.startTransaction();
            try {
                const result = await originalMethod.apply(this, [...args, session]);
                await session.commitTransaction();
                return result;
            } catch (e) {
                await session.abortTransaction();
                throw e;
            } finally {
                session.endSession();
            }
        };
    };
}
