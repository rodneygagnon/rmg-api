import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param() params: any): any {
    return this.usersService.getUser(params.id);
  }

  @Get()
  getUsers(): any {
    return this.usersService.getUsers();
  }
}
