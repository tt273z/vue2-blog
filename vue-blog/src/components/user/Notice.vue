<template>
  <div>notice page+ {{ config.wsServer }}</div>
</template>
<script>
import config from '@/assets/config'
export default {
  name: 'Notice',
  data(){
    return {
      config: config
    }
  }
};
</script>

<style lang="scss">
</style>