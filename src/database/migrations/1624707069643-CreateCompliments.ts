import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1624707069643 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "compliments",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "user_sender",
                    type: "uuid"
                },
                {
                    name: "user_receiver",
                    type: "uuid"
                },
                {
                    name: "tag_id",
                    type: "uuid"
                },
                {
                    name: "message",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
            ],
            foreignKeys: [
                {
                    name: "FK_users_compliment_sender",
                    columnNames: ["user_sender"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL",
                },
                {
                    name: "FK_users_compliment_receiver",
                    columnNames: ["user_receiver"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL",
                },
                {
                    name: "FK_tag_id",
                    columnNames: ["tag_id"],
                    referencedTableName: "tags",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL",
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('compliments');
    }

}
