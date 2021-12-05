import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import environment from 'tools/environment/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TotalModule } from './total/total.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,
    TotalModule,
    LoginModule,
    MongooseModule.forRoot(environment.mongoUrl)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
