import { Module } from '@nestjs/common';

import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogController } from './blog.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule {}
