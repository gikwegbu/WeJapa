

<template>
  <v-app id="inspire"> 

    <v-app-bar app color="primary" dark > 
      <v-btn icon text v-if="$route.name == 'WeJapa'">
          <v-icon >  mdi-monitor-dashboard </v-icon>
      </v-btn>
      <v-btn icon text v-else @click="$router.go(-1)">
          <v-icon >  mdi-chevron-left  </v-icon>
      </v-btn>

      <v-toolbar-title>
        {{ $route.name  }}
      </v-toolbar-title>
      <v-spacer></v-spacer> 
      
        <v-btn icon @click="mode" class="d-none d-sm-block">
            <v-icon left >mdi-theme-light-dark</v-icon> 
        </v-btn>
      
        <div class="text-center mr-5 ">
            <v-menu offset-y transition="slide-x-transition">
              <template v-slot:activator="{ on }"> 
                  <v-badge :content="notifyMsgCount" color="red"  overlap  > 
                      <v-icon v-on="on">mdi-email</v-icon> 
                  </v-badge>
              </template>
              <v-card  class="mx-auto" max-width="300" tile >
                <v-list two-line>
                  <v-subheader> {{ notifyMsgCount  }}  Message <span v-show="notifyMsgCount > 1">s</span>   </v-subheader>
                  <v-divider></v-divider>
                  <v-list-item-group v-model="item" color="primary">
                    <div class="text-center" v-if="notifyMsgCount == 0">
                      <v-divider style="margin: 10px auto;"></v-divider>
                      <h4>No New Report</h4> 
                      <v-divider style="margin: 10px auto;"></v-divider>
                    </div>

                    <v-list-item v-for="(msg, i) in notifyMsgs" :key="i" v-show="!msg.read" v-else :to="`/dashboard`" >
                      <v-list-item-icon>
                        <v-icon v-text="msg.icon" color="green"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="msg.title"></v-list-item-title>
                        <v-list-item-subtitle v-text="msg.text"></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text >{{ msg.time }}</v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-divider></v-divider>
                <v-btn block color="primary" text to="/message" disabled>
                    View All
                </v-btn>
              </v-card>
            </v-menu>
        </div> 

        <div class="text-center">
            <v-menu  :close-on-content-click="false" :nudge-width="100" offset-y transition="slide-y-transition" >
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" >
                  <v-avatar  size="36"  >
                    <img src="@/assets/dp.png"/>
                  </v-avatar>  
                </v-btn>
              </template>

              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <img src="@/assets/dp.png"/>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ profile.name  }}</v-list-item-title>
                      <v-list-item-subtitle>{{ profile.email  }}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{ profile.experienceLevel  }}.</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn class="red--text" icon >
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider> 

                <v-card-actions>  
                  <v-btn color="primary" text block to="/profile">View Profile</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
         </div> 
    </v-app-bar>

    <v-content>
        <v-container>
            <slot />
        </v-container>
    </v-content>
    <v-footer color="primary" app class="justify-center"> 
      <div class="d-none d-sm-block">
         <span class="white--text">&copy; 2020</span>
      </div>
      <div class="text-center d-sm-none">
        <v-btn class="" fab dark small color="" @click="mode" >
          <v-icon dark>mdi-theme-light-dark</v-icon>
        </v-btn> 

        <v-btn class="mr-12 ml-12" fab dark color="primary" to="/dashboard">
          <v-icon dark>mdi-monitor-dashboard</v-icon>
        </v-btn>

        <v-btn class="" fab dark small color="" to="/profile">
          <v-icon dark>mdi-account</v-icon>
        </v-btn> 
      </div>
    </v-footer>

    <!-- Snack -->
    <v-snackbar v-model="snackbar" :timeout="timeout" color="red">
        {{ text }}
        <v-btn color="blue" text @click="snackbar = false" >
          Close
        </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions , mapGetters } from 'vuex'
import axios from 'axios'

  export default {
    props: {
      source: String,
    },
    computed: {
      ...mapGetters([
        'token',
        'profile'
      ]),
        notifyMsgCount(){
            const _ = this;
            // return _.notifyMsgs.length
            var count = 0, 
                unreadMsg,
                totalMsgs = _.notifyMsgs;
            totalMsgs.forEach(msg => {
                msg.read == true ? count++ : count
            });
            unreadMsg = _.notifyMsgs.length - count
            return unreadMsg

        },
    },
    data: () => ({
      drawer: null,
      snackbar: false,
      text: '',
      timeout: 2000,
      item: 0,
        notifyMsgs: [
            { id: 'eowlkxjasdj4234', title: "BIR Chairman", text: 'We pay on sundays Too!!!', time: "1week", read: true, icon: 'mdi-account' },
            { id: '34534ewrttyrt', title: "Secured Job", text: 'Congratulations, You got the Job', time: "22h", read: false, icon: 'mdi-flag' },
        ],
    }),
    created() {
      this.loadJobs() 
    },
    methods: {
      ...mapActions([
        'loadStateJobs'
      ]),
      mode: function(){
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      },
      loadJobs(){
        const _ = this;
        const headers = { 
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzU3OGE1YTdiZTc1MDAxNzVjZmMwMiIsImlhdCI6MTU5MTAwNTQ3NH0.e-uUjBFx7DoChemaFQcMrYmIIa00q9mhucEzAs22Eb0`
              // 'Authorization': `Bearer ${_.token}`
          }

          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzU3OGE1YTdiZTc1MDAxNzVjZmMwMiIsImlhdCI6MTU5MTAwNTQ3NH0.e-uUjBFx7DoChemaFQcMrYmIIa00q9mhucEzAs22Eb0'
          const Config = {
            headers: {
                Authorization: "Bearer " + token
            }
          }

          axios.get(`https://wejapabackend.herokuapp.com/api/job/all`, Config )
            .then(response => { 
                _.loadStateJobs(response.data.data.jobs) 
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