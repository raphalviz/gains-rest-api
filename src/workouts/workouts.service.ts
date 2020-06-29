import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workout } from './schemas/workout.schema';
import { Model } from 'mongoose';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>,
  ) {}

  async findAllWorkouts(id: string): Promise<Array<Workout>> {
    return await this.workoutModel.find({ user_id: id });
  }

  async createWorkout(newWorkout: CreateWorkoutDto) {
    const createdWorkout: Workout = new this.workoutModel(newWorkout);
    try {
      return await createdWorkout.save();
    } catch (error) {
      console.log(error);
    }
  }

  async updateWorkoout() {}
}
