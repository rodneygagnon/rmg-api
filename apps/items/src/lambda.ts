import { HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import { ItemsModule } from './items.module';
import { ItemsService } from './items.service';

export const createItem: Handler = async (
  event: any,
  _context: Context,
  _callback: Callback,
) => {
  const appContext = await NestFactory.createApplicationContext(ItemsModule);
  const itemService = appContext.get(ItemsService);
  const item = event.body;
  try {
    const res = await itemService.createItem(item);
    return {
      statusCode: HttpStatus.OK,
      body: JSON.stringify(res),
    };
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      body: JSON.stringify(error.response ?? error.message),
    };
  }
};

export const getItem: Handler = async (
  event: any,
  _context: Context,
  _callback: Callback,
) => {
  const appContext = await NestFactory.createApplicationContext(ItemsModule);
  const itemService = appContext.get(ItemsService);
  const { id } = event.pathParameters;
  try {
    const res = await itemService.getItem(id);
    return {
      statusCode: HttpStatus.OK,
      body: JSON.stringify(res),
    };
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      body: JSON.stringify(error.response ?? error.message),
    };
  }
};

export const getItems: Handler = async (
  _event: any,
  _context: Context,
  _callback: Callback,
) => {
  const appContext = await NestFactory.createApplicationContext(ItemsModule);
  const itemsService = appContext.get(ItemsService);
  try {
    const res = await itemsService.getItems();
    return {
      statusCode: HttpStatus.OK,
      body: JSON.stringify(res),
    };
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      body: JSON.stringify(error.response ?? error.message),
    };
  }
};
