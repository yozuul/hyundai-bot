import { postgres, DataTypes } from '../utils'

const { STRING } = DataTypes

export default postgres.define('engines', {
    engine_type: {
        type: STRING
    },
    callback_action: {
        type: STRING
    },
}, {
    tableName: 'engines',
    timestamps: false
})