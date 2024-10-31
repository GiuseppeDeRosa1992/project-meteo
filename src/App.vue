<script>
import AppTableMeteo from './components/AppTableMeteo.vue';
import store from './data/store.js';
export default {
  name: 'App',

  components: {
    AppTableMeteo,
  },

  data() {
    return {
      store
    }
  }

}

</script>

<template>

  <AppTableMeteo />
</template>

<style scoped></style>
