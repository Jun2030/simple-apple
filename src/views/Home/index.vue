<script setup lang="tsx">
import { login, login2, login3 } from '@/api/login'
import ICON_LOGO from '@/assets/imgs/icon.png'
import { LocaleEnum } from '@/enum'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const { t } = useI18n()
const msg = computed(() => t('app.name'))

function toggleLocale() {
  useAppStore().SET_LOCALE(useAppStore().locale === LocaleEnum.ZH_CN ? LocaleEnum.EN_US : LocaleEnum.ZH_CN)
}

const toggleLocaleText = computed(() => {
  return `${t('demo.toggleLocale')}${useAppStore().locale === LocaleEnum.ZH_CN ? t('app.en') : t('app.zh-cn')}`
})

const value1 = ref<[Date, Date]>([
  new Date(2016, 9, 10, 8, 40),
  new Date(2016, 9, 10, 9, 40),
])

// 测试接口数据
const data = {
  username: 'admin123',
  password: 'admin123',
  tenantName: '瑟壳后台',
  rememberMe: true,
}
const data2 = {
  username: 'admin123',
  password: 'admin123',
  tenantName: '',
  rememberMe: true,
}
const resData = ref<any>()
const errData = ref<any>()

async function handleLogin() {
  resData.value = await login(data)
  $message.success(t('demo.loginSuccess'))
}

async function handleLogin2() {
  try {
    resData.value = await login2(data)
  } catch (error) {
    errData.value = error
  }
}

async function handleLogin3() {
  resData.value = await login2(data2)
}

async function handleLogin4() {
  try {
    resData.value = await login3(data2)
  } catch (error) {
    errData.value = error
  }
}
</script>

<template>
  <div>
    <p>{{ $t('demo.count') }}</p>
    <img :src="ICON_LOGO" class="logo" alt="logo">
    <HelloWorld :msg="msg" version="v1.2.1" />
    <ElButton @click="toggleLocale">
      {{ toggleLocaleText }}
    </ElButton>
    <el-time-picker
      v-model="value1"
      is-range
      range-separator="To"
      start-placeholder="Start time"
      end-placeholder="End time"
    />
    <div>
      <ElButton type="info" @click="handleLogin">
        {{ t('demo.button1') }}
      </ElButton>
      <ElButton type="info" @click="handleLogin2">
        {{ t('demo.button2') }}
      </ElButton>
      <ElButton type="info" @click="handleLogin2">
        {{ t('demo.button3') }}
      </ElButton>
      <ElButton type="info" @click="handleLogin3">
        {{ t('demo.button4') }}
      </ElButton>
      <ElButton type="info" @click="handleLogin2">
        {{ t('demo.button5') }}
      </ElButton>
      <ElButton type="info" @click="handleLogin4">
        {{ t('demo.button6') }}
      </ElButton>
      <div>
        <p>{{ t('demo.successData') }}:</p>
        <VueJsonPretty :data="resData" />
        <p>{{ t('demo.errorData') }}:</p>
        <VueJsonPretty :data="errData" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
