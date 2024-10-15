interface Config {
  axios: {
    timeout: number
    timeoutUpload: number
    authKey: string
    successCode: number[]
  }
  baseApiUrl: string
  ossApiUrl: string
}
declare global {
  interface Window {
    $config: Config
    $message: ElMessage
    $messageBox: ElMessageBox
  }

  const $config: Window['$config']
  const $message: Window['$message']
  const $messageBox: Window['$messageBox']
}

export { }
