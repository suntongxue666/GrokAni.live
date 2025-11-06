<template>
  <div class="advertisement-container">
    <a :href="adConfig.linkUrl" target="_blank" rel="noopener noreferrer">
      <img :src="adConfig.imageUrl" :alt="adConfig.altText" class="advertisement-image" />
    </a>
  </div>
</template>

<script>
import { advertisementConfig } from '../config/advertisement.js';

export default {
  name: 'Advertisement',
  data() {
    return {
      adConfig: advertisementConfig
    }
  }
}
</script>

<style scoped>
.advertisement-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.advertisement-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>