import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exercise } from '../interfaces/exercise.interface';

@Schema({ timestamps: true })
export class Workout extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  exercises: Array<Exercise>;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
