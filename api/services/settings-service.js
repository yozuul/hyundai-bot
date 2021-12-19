import { SettingsModel } from '../models'

export class SettingsService {
   // ПОДПИСКИ
   static async getBotSettings() {
      const settings = await SettingsModel.findOne({
         where: { id: 1 }
      })
      return settings
   }
   static async setDefaultCity(city) {
      const settings = await SettingsModel.findOne({
         where: { id: 1 }
      })
      settings.default_city = city
      settings.save()
      return settings
   }
   static async setDefaultDiler(diler) {
      const settings = await SettingsModel.findOne({
         where: { id: 1 }
      })
      settings.default_diler = diler
      settings.save()
      return settings
   }
   static async setDefaultPayment(payment) {
      const settings = await SettingsModel.findOne({
         where: { id: 1 }
      })
      settings.default_payment = payment
      settings.save()
      return settings
   }
}



