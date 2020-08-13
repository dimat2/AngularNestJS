import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { config } from "./orm.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(config), BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
