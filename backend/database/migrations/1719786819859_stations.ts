import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'stations'

    public async up() {
        this.schema.createTable(this.tableName, table => {
            table.increments('id')

            table.string('name').notNullable()
            table.string('slug').notNullable()
            table.string('description').notNullable()
            table.string('image')
            table.integer('creator_id').unsigned().notNullable()
            table.decimal('frequency', 3, 1).unsigned().notNullable().unique()
            table.string('music_ids')

            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
