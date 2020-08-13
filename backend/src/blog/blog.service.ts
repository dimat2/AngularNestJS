import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogDTO } from './blog.dto';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) {}    

    async showAll() {
        return await this.blogRepository.find();
    }

    async createPost(data: Partial<BlogDTO>) {
        const blog = await this.blogRepository.create(data);
        await this.blogRepository.save(data);
        return blog;
    }

    async readPost(id: number) {
        return await this.blogRepository.findOne(id);
    }

    async updatePost(id: number, data: Partial<BlogDTO>) {
        await this.blogRepository.update(id, data);
        return await this.blogRepository.findOne(id);
    }

    async deletePost(id: number) {
        await this.blogRepository.delete(id);
        return { deleted: true} 
    }
}
