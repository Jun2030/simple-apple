<script setup lang="ts">
const { msg = '', version = '' } = defineProps<{ msg: string, version: string }>()

const count = ref(0)
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>

    <div class="card">
      <ElButton type="success" round @click="count++">
        count is {{ count }}
      </ElButton>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      version: {{ version }}
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
