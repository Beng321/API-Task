import { Injectable, Inject } from '@nestjs/common';
// import { TaskDto } from 'src/dto/task.dto';
import { ITaskRepository } from 'src/interfaces/ITaskRepository.interface';
import { Task } from '../../models/task.model';
import { MetaParams } from 'src/constant/type';
import { TaskDto } from 'src/dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  findAll(): Task[] {
    return this.taskRepository.findAll();
  }

  createTask(task: TaskDto): Task {
    return this.taskRepository.create(task);
  }

  findById(id: number): Task {
    return this.taskRepository.findById(id);
  }

  updateTask(id: number, task: TaskDto): Task {
    return this.taskRepository.update(id, task);
  }

  deleteTask(id: number): boolean {
    return this.taskRepository.delete(id);
  }

  findTaskHome(meta: MetaParams): Task[] {
    return this.taskRepository.findTaskHome(meta);
  }
}
