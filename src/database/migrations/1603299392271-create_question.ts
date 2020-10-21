import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createQuestion1603299392271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'questions',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'user_id',
          type: 'integer',
          isNullable: true,
        },
        {
          name: 'product_id',
          type: 'integer',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
      foreignKeys: [
        {
          name: 'userId',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          name: 'productId',
          referencedTableName: 'products',
          referencedColumnNames: ['id'],
          columnNames: ['product_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions');
  }

}
