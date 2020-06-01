<template>
  <div class="myProfile">
    <v-card class="pa-1 mt-12 d-none d-sm-block">
        <v-row align="center" justify="center" > 
            <v-col cols="6" class="pa-2" md="6" > 
              <img src="../assets/dp.png" alt="Profile Picture" width="100%" height="400" />
            </v-col>
            <v-col cols="6"  md="6" >
                <v-card class="elevation-12 mr-2">  
                    <v-card-text> 
                        <v-form @submit="updateProfile">
                        <v-text-field placeholder="Fullname" v-model="profile.name" name="name" filled rounded type="text" ></v-text-field>
                        <v-text-field placeholder="Email" v-model="profile.email" name="email" filled rounded type="email" ></v-text-field>
                        <v-text-field placeholder="Phone" v-model="profile.phone" name="phone" filled rounded type="text" ></v-text-field>
                        <v-text-field  placeholder="Stackoverflow (optional)" v-model="profile.stackOverflow" name="stackOverflow" filled rounded type="text" ></v-text-field> 
                        <v-text-field  placeholder="Resume" v-model="profile.resume" name="resume" filled rounded type="text" ></v-text-field> 

                            <v-btn type="submit" rounded block color="primary" :disabled="loginStatus">
                                {{ loginStatus ? 'Processing...' : 'Update Profile'  }}
                                <v-icon class="fa fa-spin" v-if="loginStatus"> mdi-cog </v-icon>
                            </v-btn>

                        </v-form>
                    </v-card-text> 
                </v-card>
            </v-col>
        </v-row>
    </v-card>
    <div class="d-sm-none">
      <div class="text-center">
        <v-avatar size="200">
          <img src="../assets/dp.png"   alt="Profile Picture" >
        </v-avatar>
      </div>
       <v-card class="" flat>  
            <v-card-text> 
                <v-form @submit="updateProfile">
                    <v-text-field placeholder="Fullname" v-model="profile.name" name="name" filled rounded type="text" ></v-text-field>
                    <v-text-field placeholder="Email" v-model="profile.email" name="email" filled rounded type="email" ></v-text-field>
                    <v-text-field placeholder="Phone" v-model="profile.phone" name="phone" filled rounded type="text" ></v-text-field>
                    <v-text-field  placeholder="Stackoverflow (optional)" v-model="profile.stackOverflow" name="stackOverflow" filled rounded type="text" ></v-text-field> 
                    <v-text-field  placeholder="Resume" v-model="profile.resume" name="resume" filled rounded type="text" ></v-text-field> 

                    <v-btn type="submit" rounded block color="primary" :disabled="loginStatus">
                        {{ loginStatus ? 'Processing...' : 'Update Profile'  }}
                        <v-icon class="fa fa-spin" v-if="loginStatus"> mdi-cog </v-icon>
                    </v-btn>

                </v-form>
            </v-card-text> 
        </v-card>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="green">
        {{ text }}
        <v-btn color="blue" text @click="snackbar = false" >
            Close
        </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters  } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {
      loginStatus: false,
      name: '',
      email: '',
      phone: '',
      stackOverflow: '',
      resume: '',
      github: '',

      snackbar: false,
      text: '',
      timeout: 2000,

    }
  },
  computed: {
      ...mapGetters(['profile'])
  },
  methods: {
    updateProfile(form){
      this.loginStatus = true;
      setTimeout(() => {
        this.loginStatus = false;
        this.snackbar = true;
        this.text = 'Profile Updated';
      }, 700);
      form.preventDefault()
    }
  },
}
</script>
