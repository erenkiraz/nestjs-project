import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'libs/guards/auth.guard';
import { TokenMiddleware } from 'libs/middlewares/token.middleware';
import environment from 'tools/environment/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { LoginModule } from './login/login.module';
import { TotalModule } from './total/total.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,
    TotalModule,
    LoginModule,
    GroupModule,
    MongooseModule.forRoot(environment.mongoUrl)
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
