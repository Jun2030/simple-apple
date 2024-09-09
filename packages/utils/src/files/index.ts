export default class FilesUtils {
  /**
   * @description 获取指定目录下所有文件内容
   * @returns {Record<string, unknown>} 文件内容
   */
  static getDirContent(files: Record<string, unknown>) {
    let content: Record<string, unknown> = {}
    for (const path in files) {
      const fileContent = files[path]
      if (typeof fileContent === 'object' && fileContent !== null) {
        content = { ...content, ...fileContent }
      }
    }
    return content
  }
}

export const { getDirContent } = FilesUtils
