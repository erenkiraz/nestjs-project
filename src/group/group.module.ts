import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'libs/guards/auth.guard';
import { GroupSchema } from 'tools/models/group.model';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [ AuthGuard,
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}