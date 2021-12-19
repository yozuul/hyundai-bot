import { postgres, DataTypes } from '../utils'

const { STRING, TEXT, INTEGER, DATE, BOOLEAN } = DataTypes

export default postgres.define('models', {
    model_name: {
        type: STRING
    },
    callback_action: {
        type: STRING
    }
}, {
    tableName: 'models',
    timestamps: false
})