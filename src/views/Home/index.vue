<script setup lang="tsx">
import { getBiliHot, getHistoryAtToday, getHotNews, getJoke } from '@/api/demo'
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

const resData = ref<any>()
const errData = ref<any>()

/** 获取数据(返回简化数据-data) */
async function handleBiliHot() {
  try {
    const res = await getBiliHot()
    console.log('getBiliHot--res:', res)
    resData.value = res
    errData.value = null
  } catch (error) {
    console.log('getBiliHot--error:', error)
    errData.value = error
  }
}

/** 获取数据(返回完整数据) */
async function handleGetWeather() {
  const res = await getHistoryAtToday({
    type: 'weibo',
  })
  console.log('getHistoryAtToday--res:', res)
  resData.value = res
}

/** 获取错误信息-无业务code码 */
async function handleGetJoke() {
  const res = await getJoke()
  console.log({ res })
}

/** 获取错误信息-有业务code码 */
async function handleGetNews() {
  try {
    await getHotNews()
    $message.success(t('demo.success'))
  } catch (error) {
    console.log({ error })
    resData.value = null
    errData.value = error
  }
}

/** 同时获取不同接口 */
function handleTogether() {
  handleBiliHot()
  handleGetWeather()
}

/** 同时获取相同接口 */
function handleTogetherSame() {
  handleBiliHot()
  handleBiliHot()
  handleBiliHot()
}

/** 错误重试 */
function handleErrorRetry() {
  handleGetWeather()
  handleGetWeather()
}

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const tableData = ref<RowVO[]>([])
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
      <ElButton type="info" @click="handleBiliHot">
        {{ t('demo.button1') }}
      </ElButton>
      <ElButton type="info" @click="handleGetWeather">
        {{ t('demo.button2') }}
      </ElButton>
      <ElButton type="info" @click="handleGetJoke">
        获取错误信息-无业务code码
      </ElButton>
      <ElButton type="info" @click="handleGetNews">
        {{ t('demo.button3') }}
      </ElButton>
      <ElButton type="info" @click="handleTogether">
        同时获取不同接口
      </ElButton>
      <!-- <ElButton type="info" @click="handleLogin3">
        {{ t('demo.button4') }}
      </ElButton> -->
      <ElButton type="info" @click="handleTogetherSame">
        {{ t('demo.button5') }}
      </ElButton>
      <ElButton type="info" @click="handleErrorRetry">
        {{ t('demo.button6') }}
      </ElButton>
      <div>
        <p>{{ t('demo.successData') }}:</p>
        <VueJsonPretty :data="resData" />
        <p>{{ t('demo.errorData') }}:</p>
        <VueJsonPretty :data="errData" />
      </div>
      <div>Element Plus 图标使用</div>
      <i-ep:apple />
      <i-ep-delete class="h-20 w-20" />
      <i-ep:circle-plus class="text-2xl text-red-500" />
      <div>本地图标使用</div>
      <i-svg:home class="inline h-10 w-10" />
      <i-svg:icon-park-solid-apple class="inline text-size-20 text-red-6" />
    </div>
    <div>
      <vxe-table :data="tableData" :empty-text="$t('result.empty')">
        <vxe-column type="seq" width="70" />
        <vxe-column field="name" title="Name" />
        <vxe-column field="sex" title="Sex" />
        <vxe-column field="age" title="Age" />
      </vxe-table>
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
