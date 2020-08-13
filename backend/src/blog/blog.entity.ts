import { Entity, Column } from 'typeorm';
import { BaseEntity } from "../base-entity";

@Entity("blog")
export class Blog extends BaseEntity {
    @Column({ type: "varchar", length: 100, nullable: false})
    title: string;
    @Column({ type: "varchar", length: 100, nullable: false})
    subtitle: string;
    @Column({ type: "varchar", length: 100, nullable: true})
    imageURL: string;
    @Column({ type: "text", nullable: true, default: null})
    content: string;
}