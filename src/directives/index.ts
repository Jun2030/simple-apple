import type { App } from 'vue'
import vTrim from './input-trim'

function setupDirectives(app: App) {
  app.directive('trim', vTrim)
}

export default setupDirectives
