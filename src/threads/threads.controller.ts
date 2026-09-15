import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Patch } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import type { Request } from 'express';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewThread(@Req() request: any, @Body() createThreadDto: CreateThreadDto) {
    try {
      return await this.threadsService.createNewThread(createThreadDto, request.user.id);  
    } catch (error) {
      throw error
    }
  }

  @Get()
  async findAllThreads() {
    try {
      return await this.threadsService.findAll(); 
    } catch (error) {
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-threads')
  async findAllMyThreads(@Req() request: any) {
    try {
      return await this.threadsService.findAllMy(request.user.id);  
    } catch (error) {
      throw error
    }
  }
  
  @Get(':id')
  async findOneThread(@Param('id') id: string) {
    try {
      return await this.threadsService.findOne(+id);  
    } catch (error) {
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateThread(@Param('id') id: string, @Req() request: any, @Body() updateThreadDto: UpdateThreadDto) {
    try {
      return await this.threadsService.update(+id, request.user.id, updateThreadDto);      
    } catch (error) {
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeThread(@Param('id') id: string, @Req() request: any) {
    try {
      return await this.threadsService.remove(+id, request.user.id);  
    } catch (error) {
      throw error
    }
  }
}
