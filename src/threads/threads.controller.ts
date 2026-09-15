import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Patch } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import type { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create new thread' })
  @ApiResponse({ status: 201, description: 'Created new thread' })
  async createNewThread(@Req() request: any, @Body() createThreadDto: CreateThreadDto) {
    try {
      return await this.threadsService.createNewThread(createThreadDto, request.user.id);  
    } catch (error) {
      throw error
    }
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all threads' })
  @ApiResponse({ status: 200, description: 'Fetch all threads' })
  async findAllThreads() {
    try {
      return await this.threadsService.findAll(); 
    } catch (error) {
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-threads')
  @ApiOperation({ summary: 'Fetch user\'s threads' })
  @ApiResponse({ status: 200, description: 'Fetch logged in user\'s threads' })
  async findAllMyThreads(@Req() request: any) {
    try {
      return await this.threadsService.findAllMy(request.user.id);  
    } catch (error) {
      throw error
    }
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Fetch one thread by id' })
  @ApiResponse({ status: 200, description: 'Fetch thread by id' })
  async findOneThread(@Param('id') id: string) {
    try {
      return await this.threadsService.findOne(+id);  
    } catch (error) {
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update one of user\'s thread by id' })
  @ApiResponse({ status: 201, description: 'Update one of user\'s thread by id' })
  async updateThread(@Param('id') id: string, @Req() request: any, @Body() updateThreadDto: UpdateThreadDto) {
    try {
      return await this.threadsService.update(+id, request.user.id, updateThreadDto);      
    } catch (error) {
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletes one of user\'s thread by id' })
  @ApiResponse({ status: 204, description: 'Deletes one of user\'s thread by id'})
  async removeThread(@Param('id') id: string, @Req() request: any) {
    try {
      return await this.threadsService.remove(+id, request.user.id);  
    } catch (error) {
      throw error
    }
  }
}
