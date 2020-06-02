<template>
    <div class="bg">
        <v-container fluid>
            <v-content>
                <slot />
            </v-content>
        </v-container>
        <v-footer color="primary" app class="justify-center" >
            <span class="white--text ">&copy; WeJapa 2020</span>
        </v-footer>
    </div>
</template>

<style >
/* <style scoped> */
    .bg{
        background-image: url('../assets/bkg.svg');
        background-position: center;
        background-size: cover;
        background-repeat: repeat;
    }
</style>


<script>
export default {
    name: 'auth',
    data(){
        return {

        }
    }
}
</script>