import { postgres, DataTypes } from '../utils'

const { STRING } = DataTypes

export default postgres.define('settings', {
    default_city: {
        type: STRING
    },
    default_diler: {
        type: STRING
    },
    default_payment: {
        type: STRING
    },
}, {
    tableName: 'settings',
    timestamps: false
})