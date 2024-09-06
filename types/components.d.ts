declare module 'vue' {
  export interface GlobalComponents {
    Icon: typeof import('@/components/Icon')['Icon']
  }
}

export {}
