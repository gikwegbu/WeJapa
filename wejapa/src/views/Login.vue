<template>
    <div>
        <div class="d-sm-none"> 
            <v-card style="margin: -12px;" min-width="375" flat>
                <v-card-title light class="primary justify-center white--text mb-12 pa-12">  
                    Wejapa
                </v-card-title>
                <div class="mt-12 mb-12 text-center">
                    <v-avatar size="100">
                        <img src="../assets/logo.png" alt="wejapa image" >
                    </v-avatar>    
                </div> 
                <v-card-text class="mt-12"> 
                    <v-form @submit="login">
                        <v-text-field label="Login" v-model="email" name="email" prepend-icon="mdi-account" type="email" ></v-text-field>

                        <v-text-field id="password" v-model="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" ></v-text-field>

                        <v-btn type="submit" rounded block color="primary" :disabled="loginStatus">
                            {{ loginStatus ? 'Processing...' : 'Login'  }}
                            <v-icon class="fa fa-spin" v-if="loginStatus"> mdi-cog </v-icon>
                        </v-btn>

                    </v-form>
                </v-card-text> 
            </v-card>
        </div>
        <v-card class="pa-1 mt-12 d-none d-sm-block"  >
            <v-row align="center" justify="center" > 
                <v-col cols="6" class="pa-2" md="6" >
                      <v-carousel>
                        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition" ></v-carousel-item>
                    </v-carousel>
                </v-col>
                <v-col cols="6"  md="6" >
                    <v-card class="elevation-12 mr-2">
                        <v-toolbar color="primary" dark flat >
                            <v-toolbar-title>Login form</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn  icon large   v-on="on" >
                                    <v-icon>mdi-account-arrow-right-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Welcome Chief</span>
                            </v-tooltip>
                        </v-toolbar>
                        <v-card-text> 
                            <v-form @submit="login">
                                <v-text-field label="Login" v-model="email" name="email" prepend-icon="mdi-account" type="email" ></v-text-field>

                                <v-text-field id="password" v-model="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" ></v-text-field>

                                <v-btn type="submit" rounded block color="primary" :disabled="loginStatus">
                                    {{ loginStatus ? 'Processing...' : 'Login'  }}
                                    <v-icon class="fa fa-spin" v-if="loginStatus"> mdi-cog </v-icon>
                                </v-btn>

                            </v-form>
                        </v-card-text> 
                    </v-card>
                </v-col>
            </v-row>
        </v-card>

        <v-snackbar v-model="snackbar" :timeout="timeout" color="red">
            {{ text }}
            <v-btn color="blue" text @click="snackbar = false" >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions  } from 'vuex'
export default {
    name: 'Login',
    data(){
        return {
            email: '',
            password: '',
            loginStatus: false,
            snackbar: false,
            text: '',
            timeout: 2000,
            items: [
                { src: require('../assets/banner.png'),  },
                { src: require('../assets/ceo.svg'), },
                { src: require('../assets/cto.svg'), },
                { src: require('../assets/techguy.svg'),  },
                { src: require('../assets/japa.svg'),  },
            ],
        }
    },
 
    methods: {
        ...mapActions([
            'logUser'
        ]),
        login(e){
            const _ = this;
            e.preventDefault();
             var loginDetails = {
                "email": "favourori96@gmail.com",
                "password": "123456"
            } 
            if (!_.email || !_.password || _.email != loginDetails.email || _.password != loginDetails.password) {
                _.snackbar = true;
                _.text = 'Please Check Your Details';
                return;
            };

            _.loginStatus = true;
             
            const headers = {
                'Content-Type': 'application/json', 
            }

            axios.post(`https://wejapabackend.herokuapp.com/api/developer/login`,  loginDetails , headers )
            .then(response => { 
                _.loginStatus = false; 
                _.logUser(response.data)
                _.$router.push('/dashboard')
            })
            .catch(e => { 
                _.snackbar = true;
                _.text = e;
                _.loginStatus = false;
            })

        }
    },
}
</script>