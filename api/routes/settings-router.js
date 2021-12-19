import { Router } from 'express'
import { SettingsController } from '../controllers'

const settingsRouter = new Router()

settingsRouter.get('/getBotSettings', SettingsController.getBotSettings)
settingsRouter.post('/setDefaultCity', SettingsController.setDefaultCity)
settingsRouter.post('/setDefaultDiler', SettingsController.setDefaultDiler)
settingsRouter.post('/setDefaultPayment', SettingsController.setDefaultPayment)

export { settingsRouter }