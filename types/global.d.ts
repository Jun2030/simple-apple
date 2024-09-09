interface Config {
  axios: {
    timeout: number
    timeoutUpload: number
    successCode: number[]
  }
  baseApiUrl: string
  ossApiUrl: string
}
declare global {
  interface Window {
    mainApi: MainApi
    $config: Config
    $message: ElMessage
    $messageBox: ElMessageBox
  }

  const $config: Window['$config']
  const $message: Window['$message']
  const $messageBox: Window['$messageBox']
}

export { }
