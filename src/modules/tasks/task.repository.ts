import { Injectable } from '@nestjs/common';
import { ITaskRepository } from 'src/interfaces/ITaskRepository.interface';
import { Task } from 'src/models/task.model';
import { TaskDto } from 'src/dto/task.dto';
import { MetaParams } from 'src/constant/type';

@Injectable()
export class TaskRepository implements ITaskRepository {
  private Tasks: Task[] = [
    {
      id: 1,
      idColumn: 'td',
      content: 'task 1',
      createdAt: new Date(),
    },
    {
      id: 2,
      idColumn: 'td',
      content: 'task2',
      createdAt: new Date(),
    },
    {
      id: 3,
      idColumn: 'td',
      content: 'task4',
      createdAt: new Date(),
    },
    {
      id: 4,
      idColumn: 'td',
      content: 'task3',
      createdAt: new Date(),
    },
  ];

  findAll(): Task[] {
    return this.Tasks;
  }

  create(data: Partial<Task>): Task {
    const Task: Task = {
      id: Math.floor(Math.random() * 100),
      idColumn: data.idColumn || 'default Column',
      content: data.content || 'Default Content',
      createdAt: data.createdAt || new Date(),
      ...data,
    };
    this.Tasks = [Task, ...this.Tasks];
    return Task;
  }

  findById(id: number): Task {
    const index: number = this.Tasks.findIndex((item) => +item?.id === +id);
    return this.Tasks[index];
  }

  update(id: number, data: Partial<TaskDto>): Task {
    const index: number = this.Tasks.findIndex((item) => +item?.id === +id);
    this.Tasks[index].content = data.content;
    this.Tasks[index].createdAt = data.createdAt;
    this.Tasks[index].idColumn = data.idColumn;

    return this.Tasks[index];
  }

  delete(id: number): boolean {
    const index: number = this.Tasks.findIndex((item) => +item?.id === +id);
    if (index !== 1) {
      this.Tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  // page = 2
  findTaskHome(meta: MetaParams): Task[] {
    const limit = 3;
    const end = Number(meta.page) * limit;
    if (!meta.search) {
      const start = (Number(meta.page) - 1) * limit;
      const newTasks = this.Tasks.slice(start, end);
      return newTasks;
    } else {
      let searchTasks = this.Tasks.slice(0, end);
      return searchTasks.filter(
        (item) =>
          item.content.toUpperCase().indexOf(meta.search.toUpperCase()) !== -1,
      );
    }
  }
}
