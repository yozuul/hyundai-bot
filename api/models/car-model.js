import { postgres, DataTypes } from '../utils'

const { STRING, TEXT, INTEGER, DATE, BOOLEAN, ARRAY } = DataTypes

export default postgres.define('cars', {
    model_name: {
        type: STRING
    },
    engine_type: {
        type: STRING
    },
    equipment_name: {
        type: STRING
    },
}, {
    tableName: 'cars',
    timestamps: false
})