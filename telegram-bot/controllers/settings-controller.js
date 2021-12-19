import { $settings } from '../http'

export class SettingsController {
   static async getBotSettings() {
      return await $settings.get('/getBotSettings')
   }
   static setDefaultCity(city) {
      return $settings.post('/setDefaultCity', [city])
   }
   static setDefaultDiler(diler) {
      return $settings.post('/setDefaultDiler', [diler])
   }
   static setDefaultPayment(payment) {
      return $settings.post('/setDefaultPayment', [payment])
   }
}