<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a-icon type="github" />
    </template>
    <template v-slot:copyright>
      <span>Copyright © 2020 Muxui Blog </span>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
