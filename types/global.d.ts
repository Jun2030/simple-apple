interface Config {
  // 根据实际情况定义 $config 的结构
}

interface Message {
  // 根据实际情况定义 $message 的结构
}

interface MessageBox {
  // 根据实际情况定义 $messageBox 的结构
}

interface MainApi {
  // 根据实际情况定义 mainApi 的结构
}

declare global {
  interface Window {
    mainApi: MainApi
    $config: Config
    $message: Message
    $messageBox: MessageBox
  }

  const mainApi: Window['mainApi']
  const $config: Window['$config']
  const $message: Window['$message']
  const $messageBox: Window['$messageBox']
}

export { }
