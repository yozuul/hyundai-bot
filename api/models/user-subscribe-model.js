import { postgres, DataTypes } from '../utils'

const { STRING, BIGINT } = DataTypes

export default postgres.define('user_subscribes', {
    tg_id: {
        type: BIGINT
    },
    model: {
        type: STRING
    },
    engine: {
        type: STRING,
        allowNull: true
    },
    equipment: {
        type: STRING,
        allowNull: true
    },
}, {
    tableName: 'user_subscribes',
    timestamps: false
})
