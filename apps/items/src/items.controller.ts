import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemsService } from './items.service.js';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() item: any) {
    return this.itemsService.createItem(item);
  }

  @Get(':id')
  getItem(@Param() params: any): any {
    return this.itemsService.getItem(params.id);
  }

  @Get()
  getItems(): any {
    return this.itemsService.getItems();
  }
}
