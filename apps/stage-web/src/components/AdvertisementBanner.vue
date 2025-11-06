<script setup lang="ts">
import { ref } from 'vue'
import adConfig from '../config/adConfig'

// 点击跟踪
const handleClick = () => {
  // 这里可以添加点击跟踪代码
  console.log('Advertisement clicked')
}
</script>

<template>
  <div class="advertisement-banner w-full flex justify-center my-4">
    <a :href="adConfig.linkUrl" target="_blank" @click="handleClick">
      <img 
        :src="adConfig.imageUrl" 
        :alt="adConfig.altText"
        class="max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
        style="max-height: 150px;"
      />
    </a>
  </div>
</template>

<style scoped>
.advertisement-banner {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>