import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1721132026978 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns:[{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                unsigned: true
            },{
                name: 'code',
                type: 'int',
                isUnique: true

            },{
                name: 'name',
                type: 'varchar',
                length: '63',

            },{
                name: 'quantity',
                type: 'int',

            },{
                name: 'price',
                type: 'decimal(6,2)',

            },{
                name: 'createdAt',
                type: 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP'


            },{
                name: 'updatedAt',
                type: 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP'

            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');

    }

}
