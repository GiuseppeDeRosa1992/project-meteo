<script>
import AppHeader from './components/AppHeader.vue';
import AppTableMeteo from './components/AppTableMeteo.vue';
export default {
  name: 'App',

  components: {
    AppHeader,
    AppTableMeteo,
  },

  data() {
    return {

    }
  }

}

</script>

<template>
  <AppHeader />
  <AppTableMeteo />
</template>

<style scoped></style>
