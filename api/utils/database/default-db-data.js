const defaultCarName = [{
      model_name: 'Новый TUCSON',
      callback_action: 'model_1'
   },
   {
      model_name: 'SANTA FE',
      callback_action: 'model_2'
   },
   {
      model_name: 'ELANTRA',
      callback_action: 'model_3'
   },
   {
      model_name: 'PALISADE',
      callback_action: 'model_4'
   },
   {
      model_name: 'SONATA',
      callback_action: 'model_5'
   },
   {
      model_name: 'Новая CRETA',
      callback_action: 'model_6'
   },
   {
      model_name: 'SOLARIS',
      callback_action: 'model_7'
   },
]
const defaultEngineType = [
   // Новый TUCSON
   {
      engine_type: 'Smartstream G2.0 - 6AT - 2WD',
      callback_action: 'engine_1'
   },
   {
      engine_type: 'Smartstream G2.0 - 6AT - 4WD',
      callback_action: 'engine_2'
   },
   {
      engine_type: 'Smartstream D2.0 - 8AT - 4WD',
      callback_action: 'engine_3'
   },
   {
      engine_type: 'Smartstream G2.0 - 6MT - 2WD',
      callback_action: 'engine_4'
   },
   {
      engine_type: 'Smartstream G2.5 GDi  - 8AT - 4WD',
      callback_action: 'engine_5'
   },
   {
      engine_type: 'Smartstream G2.0 - 6MT - 4WD',
      callback_action: 'engine_6'
   },
   // SANTA FE
   {
      engine_type: '2.2л - 8DCT - 4WD',
      callback_action: 'engine_7'
   },
   {
      engine_type: '2.5л - 6АТ - 4WD',
      callback_action: 'engine_8'
   },
   {
      engine_type: '3.5л - 8AT - 4WD',
      callback_action: 'engine_9'
   },
   // ELANTRA
   {
      engine_type: 'Smartstream G2.0 6AT',
      callback_action: 'engine_10'
   },
   {
      engine_type: '1.6 MPI 6AT',
      callback_action: 'engine_11'
   },
   // PALISADE
   {
      engine_type: '2.2 - 8AT CRDi - 4WD',
      callback_action: 'engine_12'
   },
   {
      engine_type: '3.5 - 8АТ MPI - 4WD',
      callback_action: 'engine_13'
   },
   // SONATA
   {
      engine_type: '2.5 MPI - 6AT',
      callback_action: 'engine_14'
   },
   {
      engine_type: '2.0 MPI - 6AT',
      callback_action: 'engine_15'
   },
   // Новая CRETA
   {
      engine_type: '2.0л 6AT 2WD',
      callback_action: 'engine_16'
   },
   {
      engine_type: '1.6л 6AT 2WD',
      callback_action: 'engine_17'
   },
   {
      engine_type: '1.6л 6MT 2WD',
      callback_action: 'engine_18'
   },
   {
      engine_type: '2.0л 6AT 4WD',
      callback_action: 'engine_19'
   },
   {
      engine_type: '1.6л 6MT 4WD',
      callback_action: 'engine_20'
   },
   {
      engine_type: '1.6л 6AT 4WD',
      callback_action: 'engine_21'
   },
   // SOLARIS
   {
      engine_type: '1.6 - 6АТ',
      callback_action: 'engine_22'
   },
   {
      engine_type: '1.4 - 6МТ',
      callback_action: 'engine_23'
   },
   {
      engine_type: '1.6 - 6МТ',
      callback_action: 'engine_24'
   },
   {
      engine_type: '1.4 - 6АТ',
      callback_action: 'engine_25'
   }
]

const defaultEquipmentName = [{
      equipment_name: 'Lifestyle',
      callback_action: 'equipment_1'
   },
   {
      equipment_name: 'Family',
      callback_action: 'equipment_2'
   },
   {
      equipment_name: 'Classic',
      callback_action: 'equipment_3'
   },
   {
      equipment_name: 'Prestige',
      callback_action: 'equipment_4'
   },
   {
      equipment_name: 'Visioner',
      callback_action: 'equipment_5'
   },
   {
      equipment_name: 'High-tech',
      callback_action: 'equipment_6'
   },
   {
      equipment_name: 'Calligraphy',
      callback_action: 'equipment_7'
   },
   {
      equipment_name: 'Elegance',
      callback_action: 'equipment_8'
   },
   {
      equipment_name: 'Active',
      callback_action: 'equipment_9'
   },
   {
      equipment_name: 'Anniversary с интерьером Светло-серый Меланж',
      callback_action: 'equipment_10'
   },
   {
      equipment_name: 'Anniversary',
      callback_action: 'equipment_11'
   },
   {
      equipment_name: 'Way',
      callback_action: 'equipment_12'
   },
   {
      equipment_name: 'Base',
      callback_action: 'equipment_13'
   },
   {
      equipment_name: 'Cosmos (7 мест)',
      callback_action: 'equipment_14'
   },
   {
      equipment_name: 'Cosmos (8 мест)',
      callback_action: 'equipment_15'
   },
   {
      equipment_name: 'Business',
      callback_action: 'equipment_16'
   },
   {
      equipment_name: 'Style (Winter)',
      callback_action: 'equipment_17'
   },
   {
      equipment_name: 'Prestige (Winter)',
      callback_action: 'equipment_18'
   },
   {
      equipment_name: 'Comfort (Winter)',
      callback_action: 'equipment_19'
   },
   {
      equipment_name: 'Business (Winter)',
      callback_action: 'equipment_20'
   },
   {
      equipment_name: 'Lifestyle с двухцветным кузовом',
      callback_action: 'equipment_21'
   },
   {
      equipment_name: 'Prime',
      callback_action: 'equipment_22'
   },
   {
      equipment_name: 'Active Plus',
      callback_action: 'equipment_23'
   },
   {
      equipment_name: 'Prosafety',
      callback_action: 'equipment_24'
   },
   {
      equipment_name: 'Специальная серия "10 лет"',
      callback_action: 'equipment_25'
   },
   {
      equipment_name: 'Специальная серия "10 лет" + пакет Comfort',
      callback_action: 'equipment_26'
   },
   {
      equipment_name: 'Comfort New',
      callback_action: 'equipment_27'
   },
   {
      equipment_name: 'Elegance New',
      callback_action: 'equipment_28'
   },
   {
      equipment_name: 'Active Plus New',
      callback_action: 'equipment_29'
   },
   {
      equipment_name: 'Style',
      callback_action: 'equipment_30'
   },
   {
      equipment_name: 'Comfort',
      callback_action: 'equipment_31'
   },
   {
      equipment_name: 'Classic (Winter)',
      callback_action: 'equipment_32'
   },
]

const defaultCars = [
   // Новый TUCSON
   {
      model_name: 'model_1',
      engine_type: 'engine_1',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_1',
      equipment_name: 'equipment_2',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_1',
      equipment_name: 'equipment_3',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_2',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_2',
      equipment_name: 'equipment_4',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_2',
      equipment_name: 'equipment_2',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_3',
      equipment_name: 'equipment_4',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_3',
      equipment_name: 'equipment_5',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_3',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_4',
      equipment_name: 'equipment_3',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_5',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_5',
      equipment_name: 'equipment_2',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_5',
      equipment_name: 'equipment_5',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_5',
      equipment_name: 'equipment_4',
   },
   {
      model_name: 'model_1',
      engine_type: 'engine_6',
      equipment_name: 'equipment_2',
   },
   // SANTA FE
   {
      model_name: 'model_2',
      engine_type: 'engine_7',
      equipment_name: 'equipment_6',
   },
   {
      model_name: 'model_2',
      engine_type: 'engine_7',
      equipment_name: 'equipment_4',
   },
   {
      model_name: 'model_2',
      engine_type: 'engine_7',
      equipment_name: 'equipment_5',
   },
   {
      model_name: 'model_2',
      engine_type: 'engine_7',
      equipment_name: 'equipment_7',
   },
   {
      model_name: 'model_2',
      engine_type: 'engine_8',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_2',
      engine_type: 'engine_8',
      equipment_name: 'equipment_4',
   },
   {
      model_name: 'model_2',
      engine_type: 'engine_8',
      equipment_name: 'equipment_2',
   },
   {
      model_name: 'model_2',
      engine_type: 'engine_9',
      equipment_name: 'equipment_6',
   },
   {
      model_name: 'model_2',
      engine_type: 'engine_9',
      equipment_name: 'equipment_7',
   },
   // ELANTRA
   {
      model_name: 'model_3',
      engine_type: 'engine_10',
      equipment_name: 'equipment_8',
   },
   {
      model_name: 'model_3',
      engine_type: 'engine_10',
      equipment_name: 'equipment_9',
   },
   {
      model_name: 'model_3',
      engine_type: 'engine_10',
      equipment_name: 'equipment_10',
   },
   {
      model_name: 'model_3',
      engine_type: 'engine_10',
      equipment_name: 'equipment_11',
   },
   {
      model_name: 'model_3',
      engine_type: 'engine_10',
      equipment_name: 'equipment_12',
   },
   {
      model_name: 'model_3',
      engine_type: 'engine_11',
      equipment_name: 'equipment_9',
   },
   {
      model_name: 'model_3',
      engine_type: 'engine_11',
      equipment_name: 'equipment_13',
   },
   {
      model_name: 'model_3',
      engine_type: 'engine_11',
      equipment_name: 'equipment_12',
   },
   {
      model_name: 'model_3',
      engine_type: 'engine_11',
      equipment_name: 'equipment_8',
   },
   // PALISADE
   {
      model_name: 'model_4',
      engine_type: 'engine_12',
      equipment_name: 'equipment_6',
   },
   {
      model_name: 'model_4',
      engine_type: 'engine_12',
      equipment_name: 'equipment_14',
   },
   {
      model_name: 'model_4',
      engine_type: 'engine_12',
      equipment_name: 'equipment_4',
   },
   {
      model_name: 'model_4',
      engine_type: 'engine_12',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_4',
      engine_type: 'engine_12',
      equipment_name: 'equipment_15',
   },
   {
      model_name: 'model_4',
      engine_type: 'engine_13',
      equipment_name: 'equipment_6',
   },
   {
      model_name: 'model_4',
      engine_type: 'engine_13',
      equipment_name: 'equipment_14',
   },
   {
      model_name: 'model_4',
      engine_type: 'engine_13',
      equipment_name: 'equipment_4',
   },
   {
      model_name: 'model_4',
      engine_type: 'engine_13',
      equipment_name: 'equipment_15',
   },
   {
      model_name: 'model_4',
      engine_type: 'engine_13',
      equipment_name: 'equipment_1',
   },
   // SONATA
   {
      model_name: 'model_5',
      engine_type: 'engine_14',
      equipment_name: 'equipment_16',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_14',
      equipment_name: 'equipment_8',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_14',
      equipment_name: 'equipment_4',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_14',
      equipment_name: 'equipment_17',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_14',
      equipment_name: 'equipment_18',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_14',
      equipment_name: 'equipment_19',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_14',
      equipment_name: 'equipment_20',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_14',
      equipment_name: 'equipment_12',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_15',
      equipment_name: 'equipment_30',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_15',
      equipment_name: 'equipment_31',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_15',
      equipment_name: 'equipment_3',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_15',
      equipment_name: 'equipment_19',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_15',
      equipment_name: 'equipment_17',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_15',
      equipment_name: 'equipment_32',
   },
   {
      model_name: 'model_5',
      engine_type: 'engine_15',
      equipment_name: 'equipment_12',
   },
   // Новая CRETA
   {
      model_name: 'model_6',
      engine_type: 'engine_16',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_16',
      equipment_name: 'equipment_2',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_16',
      equipment_name: 'equipment_21',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_17',
      equipment_name: 'equipment_3',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_17',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_17',
      equipment_name: 'equipment_22',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_17',
      equipment_name: 'equipment_2',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_17',
      equipment_name: 'equipment_21',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_18',
      equipment_name: 'equipment_3',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_18',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_19',
      equipment_name: 'equipment_1',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_20',
      equipment_name: 'equipment_3',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_20',
      equipment_name: 'equipment_2',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_21',
      equipment_name: 'equipment_2',
   },
   {
      model_name: 'model_6',
      engine_type: 'engine_21',
      equipment_name: 'equipment_1',
   },
   // SOLARIS
   {
      model_name: 'model_7',
      engine_type: 'engine_22',
      equipment_name: 'equipment_8',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_22',
      equipment_name: 'equipment_23',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_22',
      equipment_name: 'equipment_31',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_22',
      equipment_name: 'equipment_24',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_22',
      equipment_name: 'equipment_25',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_22',
      equipment_name: 'equipment_26',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_22',
      equipment_name: 'equipment_27',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_22',
      equipment_name: 'equipment_28',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_22',
      equipment_name: 'equipment_29',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_23',
      equipment_name: 'equipment_23',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_23',
      equipment_name: 'equipment_31',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_24',
      equipment_name: 'equipment_31',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_24',
      equipment_name: 'equipment_8',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_24',
      equipment_name: 'equipment_23',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_24',
      equipment_name: 'equipment_25',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_24',
      equipment_name: 'equipment_26',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_24',
      equipment_name: 'equipment_27',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_24',
      equipment_name: 'equipment_29',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_25',
      equipment_name: 'equipment_31',
   },
   {
      model_name: 'model_7',
      engine_type: 'engine_25',
      equipment_name: 'equipment_23',
   }
]

const defaultUser = [
   {
      name: 'MasterChu',
      role_id: 1,
      tg_id: 1884297416,
      phone_num: '+79272996630'
   },
   {
      name: 'Артур Д',
      role_id: 1,
      tg_id: 5076836045,
      phone_num: '+79265606830'
   },
   {
      name: 'Maxim',
      role_id: 2,
      tg_id: 1024964948,
      phone_num: '+79853354575'
   },
   {
      name: 'Леся',
      role_id: 2,
      tg_id: 568424710,
      phone_num: '+79855214847'
   },
   {
      name: 'Рузо Кар',
      role_id: 2,
      tg_id: 5025348677,
      phone_num: '+79171337439'
   },
   {
      name: 'User',
      role_id: 2,
      tg_id: 5063403370,
      phone_num: '+79265604518'
   },
   {
      name: 'User',
      role_id: 2,
      tg_id: 5049109986,
      phone_num: '+79265605823'
   },
]

const defaultUserSubscribe = [
   {
      tg_id: 1884297416,
      model: 'model_1',
      engine: 'engine_1',
      equipment: 'equipment_1',
   },
   {
      tg_id: 1308608098,
      model: 'model_1',
      engine: 'engine_1',
      equipment: 'equipment_1',
   }
]
const defaultSettings = [
   {
      default_city: 'Ростов-на-Дону',
      default_diler: 'ААА моторс',
      default_payment: 'Наличные',
   },
]

export {
   defaultUser,
   defaultUserSubscribe,
   defaultCarName,
   defaultEngineType,
   defaultEquipmentName,
   defaultCars,
   defaultSettings
}