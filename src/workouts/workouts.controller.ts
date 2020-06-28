import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Exercise } from './interfaces/exercise.interface';
import { SetType } from './interfaces/sets.interface';
import { Workout } from './schemas/workout.schema';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users/:id/workouts')
export class WorkoutsController {
  constructor(private readonly workoutService: WorkoutsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req, @Res() res, @Param() params) {
    if (params.id === req.user.id) {
      const workouts = await this.workoutService.findAllWorkouts(params.id);
      return res.status(HttpStatus.OK).json(workouts);
    }

    return res.status(HttpStatus.UNAUTHORIZED).end();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createWorkout(
    @Req() req,
    @Res() res,
    @Param() params,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    if (params.id === req.user.id) {
      const newWorkout = {
        user_id: req.user.id,
        ...createWorkoutDto,
      };
      const workout = await this.workoutService.createWorkout(newWorkout);
      return res.status(HttpStatus.CREATED).json(workout.id);
    }

    return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
  }
}
