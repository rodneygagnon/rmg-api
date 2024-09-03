import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v1 } from 'uuid';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

const db = DynamoDBDocument.from(new DynamoDB());

@Injectable()
export class ItemsService {
  async createItem(item: any) {
    const { title, description } = item;
    const createdOn = new Date().getTime();

    const data = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: v1(),
        title,
        description,
        createdOn,
      },
    };

    try {
      await db.put(data);
      return item;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getItem(id: string) {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id },
    };

    try {
      const result = await db.get(params);
      return result.Item;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getItems() {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
    };

    try {
      const result = await db.scan(params);
      return result.Items;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
