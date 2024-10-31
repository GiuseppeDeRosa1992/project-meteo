<script>
import AppHeader from './components/AppHeader.vue';
import AppTableMeteo from './components/AppTableMeteo.vue';
import store from './data/store.js';
export default {
  name: 'App',

  components: {
    AppHeader,
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
  <AppHeader />
  <AppTableMeteo />
</template>

<style scoped></style>
