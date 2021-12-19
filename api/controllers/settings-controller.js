import { SettingsService } from '../services'

export class SettingsController {
    static async getBotSettings (req, res, next) {
        try {
            const settings = await SettingsService.getBotSettings()
            return res.json(settings)
        } catch (err) {
            next(err)
        }
    }
    static async setDefaultCity (req, res, next) {
        try {
            const settings = await SettingsService.setDefaultCity(...req.body)
            return res.json(settings)
        } catch (err) {
            next(err)
        }
    }
    static async setDefaultDiler (req, res, next) {
        try {
            const settings = await SettingsService.setDefaultDiler(...req.body)
            return res.json(settings)
        } catch (err) {
            next(err)
        }
    }
    static async setDefaultPayment (req, res, next) {
        try {
            const settings = await SettingsService.setDefaultPayment(...req.body)
            return res.json(settings)
        } catch (err) {
            next(err)
        }
    }
}
