<template>
  <v-app> 
    <component :is="layout">
      <router-view/> 
    </component>
  </v-app>
</template>

<style scoped>  

</style>


<script> 
const auth = 'Auth'

export default {
  name: 'App',

  computed: {
    layout(){
      // This watches the data 'layout', then returns the value of the $route.meta.layout assigned to each page or it returns the const delcared variable UserAuth then attach it to '-layout'
      return (this.$route.meta.layout || auth) + '-layout'
    }
  },

  data: () => ({
    //
  }),
};
</script>
