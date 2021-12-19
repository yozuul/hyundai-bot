const consoleCallback = (callback) => {
   console.log(('Callback:').darkGray, (callback).green)
}

const checkNeedAuthorization = (code, chat_id, initParser) => {
   initParser.confirmCode(code, chat_id)
}

const loadExistAccount = async (initParser, initMenu) => {
   const result = await initParser.loadExistAccount()
   if(result) {
      result.map((account) => {
         if(!account.authorize) {
            initMenu.confirmLogin(account.tg_id)
         }
      })
   }
}

export { consoleCallback, checkNeedAuthorization, loadExistAccount, loadLocalStorage }