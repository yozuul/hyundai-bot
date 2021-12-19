import { UserService } from '../services'

export class UserController {
    static async getAll(req, res, next) {
        try {
            const users = await UserService.getAll()
            return res.json(users)
        } catch (err) {
            next(err)
        }
    }
    static async findById(req, res, next) {
        try {
            const userProfile = await UserService.findById(...req.body)
            return res.json(userProfile)
        } catch (err) {
            next(err)
        }
    }
    static async findByPhone(req, res, next) {
        try {
            const userProfile = await UserService.findByPhone(...req.body)
            return res.json(userProfile)
        } catch (err) {
            next(err)
        }
    }
    static async getSubscribes(req, res, next) {
        try {
            const userSubscribe = await UserService.getSubscribes(...req.body)
            return res.json(userSubscribe)
        } catch (err) {
            next(err)
        }
    }
    static async subscribeAllModels(req, res, next) {
        try {
            const userSubscribe = await UserService.subscribeAllModels(req.body)
            return res.json(userSubscribe)
        } catch (err) {
            next(err)
        }
    }
    static async subscribeAllEngines(req, res, next) {
        try {
            const userSubscribe = await UserService.subscribeAllEngines(req.body)
            return res.json(userSubscribe)
        } catch (err) {
            next(err)
        }
    }
    static async subscribeAllEquipments(req, res, next) {
        try {
            const userSubscribe = await UserService.subscribeAllEquipments(req.body)
            return res.json(userSubscribe)
        } catch (err) {
            next(err)
        }
    }
    static async checkEquipmentSubscribe(req, res, next) {
        try {
            const userSubscribe = await UserService.checkEquipmentSubscribe(req.body)
            return res.json(userSubscribe)
        } catch (err) {
            next(err)
        }
    }
    static async unsubscribeAll(req, res, next) {
        try {
            const userSubscribe = await UserService.unsubscribeAll(...req.body)
            return res.json(userSubscribe)
        } catch (err) {
            next(err)
        }
    }
    static async saveNewPhone(req, res, next) {
        try {
            const newPhone = await UserService.saveNewPhone(...req.body)
            return res.json(newPhone)
        } catch (err) {
            next(err)
        }
    }
    static async confirmPhone(req, res, next) {
        try {
            const newPhone = await UserService.confirmPhone(req.body)
            return res.json(newPhone)
        } catch (err) {
            next(err)
        }
    }
    static async deletePhone(req, res, next) {
        console.log(req.body)
        try {
            const newPhone = await UserService.deletePhone(req.body)
            return res.json(newPhone)
        } catch (err) {
            next(err)
        }
    }
}
