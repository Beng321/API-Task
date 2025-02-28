import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/constant/decorator';
import { ServerMessage, ServerStatus } from 'src/constant/enum';
import { ResponseType } from 'src/constant/type';
import { TaskDto } from 'src/dto/task.dto';
import { ResponseData } from 'src/services/response.service';
import { Task } from '../../models/task.model';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Public()
  @Get()
  getTasks(@Res() res: Response): ResponseType<Task> {
    try {
      return res.json(
        new ResponseData(
          this.taskService.findAll(),
          ServerStatus.OK,
          ServerMessage.OK,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, ServerStatus.ERROR, ServerMessage.ERROR),
      );
    }
  }

  @Public()
  @Post()
  createTask(@Body() task: TaskDto, @Res() res: Response): ResponseType<Task> {
    try {
      return res.json(
        new ResponseData(
          this.taskService.createTask(task),
          ServerStatus.OK,
          ServerMessage.OK,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, ServerStatus.ERROR, ServerMessage.ERROR),
      );
    }
  }

  @Public()
  @Get('/:id')
  detailTask(
    @Param('id') id: number,
    @Res() res: Response,
  ): ResponseType<Task> {
    try {
      return res.json(
        new ResponseData(
          this.taskService.findById(id),
          ServerStatus.OK,
          ServerMessage.OK,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, ServerStatus.ERROR, ServerMessage.ERROR),
      );
    }
  }

  @Public()
  @Put('/:id')
  updateTask(
    @Param('id') id: number,
    @Body() task: TaskDto,
    @Res() res: Response,
  ): ResponseType<Task> {
    try {
      return res.json(
        new ResponseData(
          this.taskService.updateTask(id, task),
          ServerStatus.OK,
          ServerMessage.OK,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, ServerStatus.ERROR, ServerMessage.ERROR),
      );
    }
  }

  @Public()
  @Delete('/:id')
  deleteTask(
    @Param('id') id: number,
    @Res() res: Response,
  ): ResponseType<Task> {
    try {
      return res.json(
        new ResponseData(
          this.taskService.deleteTask(id),
          ServerStatus.OK,
          ServerMessage.OK,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, ServerStatus.ERROR, ServerMessage.ERROR),
      );
    }
  }

  @Public()
  @Get('/tasks')
  getHomeTasks(@Res() res: Response): ResponseType<Task> {
    try {
      return res.json(
        new ResponseData(
          this.taskService.findTaskHome({ page: '1', search: '' }),
          ServerStatus.OK,
          ServerMessage.OK,
        ),
      );
    } catch (error) {
      res.header('Access-Control-Allow-Origin', '*');
      return res.json(
        new ResponseData(null, ServerStatus.ERROR, ServerMessage.ERROR),
      );
    }
  }
}
