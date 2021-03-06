import { postgres, DataTypes } from '../utils'

const { STRING } = DataTypes

export default postgres.define('equipments', {
    equipment_name: {
        type: STRING
    },
    callback_action: {
        type: STRING
    },
}, {
    tableName: 'equipments',
    timestamps: false
})