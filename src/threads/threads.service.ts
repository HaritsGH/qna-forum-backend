import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadsRepository } from './threads.repository';

@Injectable()
export class ThreadsService {
  constructor(private readonly threadsRepository: ThreadsRepository) {}

  async createNewThread(createThreadDto: CreateThreadDto, userId: number) {
    return {
      message: 'New thread created',
      statusCode: '201',
      data: await this.threadsRepository.createNewThread(createThreadDto, userId)
    };
  }

  async findAll() {
    return {
      message: 'Fetched all threads',
      statusCode: '200',
      data: await this.threadsRepository.findAll()
    };
  }

  async findAllMy(userId: number) {
    return {
      message: 'Fetched all My threads',
      statusCode: '200',
      data: await this.threadsRepository.findAllMy(userId)
    };
  }

  async findOne(id: number) {
    const thread = await this.threadsRepository.findOne(id)

    if (!thread) {
      throw new NotFoundException('Thread not found.')
    }

    return {
      message: 'Thread found',
      statusCode: '200',
      data: thread
    };
  }

  async update(id: number, userId: number, updateThreadDto: UpdateThreadDto) {
    const thread = await this.threadsRepository.findOne(id)
    if (!thread) {
      throw new NotFoundException('Thread not found.')
    }

    if (thread.userId !== userId) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    return {
      message: 'Thread updated',
      statusCode: '200',
      data: await this.threadsRepository.update(id, updateThreadDto)
    };
  }

  async remove(id: number, userId: number) {
    const thread = await this.threadsRepository.findOne(id)
    if (!thread) {
      throw new NotFoundException('Thread not found.')
    }

    if (thread.userId !== userId) {
      throw new UnauthorizedException('Invalid credentials.')
    }
    
    return {
      message: 'Thread deleted',
      statusCode: '204',
      data: await this.threadsRepository.remove(id)
    };
  }
}
