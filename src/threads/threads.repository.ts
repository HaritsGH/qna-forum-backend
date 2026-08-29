import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ThreadsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createNewThread(createThreadDto: CreateThreadDto, userId) {
    return this.prisma.thread.create({
      data: {
        title: createThreadDto.title,
        content: createThreadDto.content,
        userId: userId
      }
    });
  }

  findAll() {
    return this.prisma.thread.findMany();
  }

  findAllMy(userId: number) {
    return this.prisma.thread.findMany({
      where: {userId}
    });
  }

  findOne(id: number) {
    return this.prisma.thread.findUnique({
      where: { id }
    });
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return this.prisma.thread.update({
      where: { id },
      data: {
        title: updateThreadDto.title,
        content: updateThreadDto.content,
      }
    });
  }

  remove(id: number) {
    return this.prisma.thread.delete({
      where: { id }
    });
  }
}
