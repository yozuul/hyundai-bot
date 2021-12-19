import { postgres, DataTypes } from '../utils'

const { STRING } = DataTypes

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