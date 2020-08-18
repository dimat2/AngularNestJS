import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: "postgres",
    username: "postgres",
    password: "hitman52",
    port: 5432,
    host: "127.0.0.1",
    database: "blog",
    synchronize: true,
    entities: ["dist/**/*.entity{.ts,.js}"]
}