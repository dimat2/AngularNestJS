import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDTO } from './blog.dto';

@Controller('blog')
export class BlogController {
    
    constructor(private blogService: BlogService) {
    }

    @Get()
    showAll() {
        return this.blogService.showAll();
    }

    @Post("/create")
    createPost(@Body() data: BlogDTO) {
        return this.blogService.createPost(data);
    }

    @Get(":id")
    readPost(@Param() id: number) {
        return this.blogService.readPost(id);
    }

    @Put(":id")
    updatePost(@Param() id: number, @Body() data: Partial<BlogDTO>) {
        return this.blogService.updatePost(id, data);
    }

    @Delete(":id")
    deletePost(@Param() id: number) {
        return this.blogService.deletePost(id);
    }

}
