// apps/users/users.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

const db = DynamoDBDocument.from(new DynamoDB());

@Injectable()
export class UsersService {
  async getUser(id: string) {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id },
      AttributesToGet: ['id', 'email', 'firstName', 'lastName']
    };

    try {
      const result = await db.get(params);
      return result.Item;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUsers() {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      AttributesToGet: ['id', 'email', 'firstName', 'lastName']
    };

    try {
      const result = await db.scan(params);
      return result.Items;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
