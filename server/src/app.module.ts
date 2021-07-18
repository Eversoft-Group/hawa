import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { PostController } from './controller/posts.controller';
import { PostService } from './services/post.service';

@Module({
  imports: [],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
