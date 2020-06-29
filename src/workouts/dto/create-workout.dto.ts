import { IsNotEmpty } from 'class-validator';
import { Exercise } from '../interfaces/exercise.interface';

export class CreateWorkoutDto {
  @IsNotEmpty()
  exercises: Array<Exercise>;
}
