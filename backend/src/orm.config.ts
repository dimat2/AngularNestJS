import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: "postgres",
    username: "cgqaegscupfevh",
    password: "b85aedb8d484e041ad75171d0b4a00aee1e9bd35f0e55f9a497e3c8e8878c854",
    port: 5432,
    host: "ec2-46-137-100-204.eu-west-1.compute.amazonaws.com",
    database: "d9o1tnokhdq244",
    synchronize: true,
    entities: ["dist/**/*.entity{.ts,.js}"]
}