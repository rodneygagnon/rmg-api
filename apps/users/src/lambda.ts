import process from 'node:process';

import { Callback, Context, Handler } from 'aws-lambda';

import { HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module.js';
import { UsersService } from './users.service.js';

export const getUser: Handler = async (
  event: any,
  _context: Context,
  _callback: Callback,
) => {
  console.log(`getUser (${import.meta.filename}): ${process.uptime()}`);

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Hello, World!',
  //     uptime: process.uptime(),
  //   })
  // };

  const appContext = await NestFactory.createApplicationContext(UsersModule);
  const usersService = appContext.get(UsersService);
  const { id } = event.pathParameters;
  try {
    const res = await usersService.getUser(id);
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

export const getUsers: Handler = async (
  _event: any,
  _context: Context,
  _callback: Callback,
) => {
  console.log(`getUsers (${import.meta.filename}): ${process.uptime()}`);

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Hello, World!',
  //     uptime: process.uptime(),
  //   })
  // };

  const appContext = await NestFactory.createApplicationContext(UsersModule);
  const usersService = appContext.get(UsersService);
  try {
    const res = await usersService.getUsers();
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
