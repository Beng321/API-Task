import { Task } from 'src/models/task.model';
import { AbstractOrigin } from './AbstractRepository.interface';
import { MetaParams } from 'src/constant/type';

export interface ITaskRepository extends AbstractOrigin<Task> {
  findTaskHome(meta: MetaParams): Task[];
}
