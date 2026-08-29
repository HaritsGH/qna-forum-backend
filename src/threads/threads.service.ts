import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadsRepository } from './threads.repository';

@Injectable()
export class ThreadsService {
  constructor(private readonly threadsRepository: ThreadsRepository) {}

  createNewThread(createThreadDto: CreateThreadDto, userId: number) {
    return this.threadsRepository.createNewThread(createThreadDto, userId);
  }

  findAll() {
    return this.threadsRepository.findAll();
  }

  findAllMy(userId: number) {
    return this.threadsRepository.findAllMy(userId);
  }

  findOne(id: number) {
    return this.threadsRepository.findOne(id);
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return this.threadsRepository.update(id, updateThreadDto);
  }

  remove(id: number) {
    return this.threadsRepository.remove(id);
  }
}
