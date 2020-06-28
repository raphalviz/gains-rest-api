import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/google.strategy';
import { AuthModule } from './auth/auth.module';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development']
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      autoIndex: true,
      useCreateIndex: true
    }),
    UsersModule,
    AuthModule,
    WorkoutsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
