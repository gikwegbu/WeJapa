<template>
    <div>
        <v-card flat>
            <v-card-title>
                Latest Roles
                <v-spacer></v-spacer> 
                <div class="subtitle-1" @click="filterJob()">
                    {{ filterActive ? 'View Less ' : 'View All >>'   }}  
                </div>   
            </v-card-title> 
            <v-container>
            <v-card-text>
              <v-text-field v-model="search" placeholder="Search..." filled ></v-text-field>
            </v-card-text>
            <div class="grey lighten-1 pa-6 white--text text-center mt-12" v-if="searchJobs && !searchJobs.length">
              <h3>Such Job does not exist, Try another keyword</h3>
            </div>

                <v-row v-else>
                    <v-col cols="12" v-if="!filterActive">
                        <v-list rounded>  
                            <v-list-item v-for="(job, index) in searchJobs" :key="index" @click="preview(job)" class="borderBottom ">
                                <v-list-item-avatar>
                                    <v-img src="../assets/logo.png"  alt="WeJapa Logo"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title > {{ job.title  }} </v-list-item-title> 
                                <v-list-item-subtitle > {{ job.type.split('-')[0]  }} - <span :class="job.status == 'Closed' ? 'red--text' : 'green--text' "> {{ job.status  }} </span> </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-icon color="grey">mdi-briefcase</v-icon> 
                                    <v-list-item-action-text > &#36;{{ job.salary  }} </v-list-item-action-text> 
                                </v-list-item-action>
                            </v-list-item> 
                        </v-list>
                    </v-col>
                    <v-col cols="12" v-else>
                      <div class="grey lighten-1 pa-6 white--text text-center mt-12" v-if="searchFilteredJobs && !searchJobs.length">
                        <h3>Such Job does not exist, Try another keyword</h3>
                      </div>
                        <v-list rounded v-else>  
                            <!-- <v-list-item v-for="(job, index) in filteredJobs" :key="index" @click="preview(job)" class="borderBottom "> -->
                            <v-list-item v-for="(job, index) in searchFilteredJobs" :key="index" @click="preview(job)" class="borderBottom ">
                                <v-list-item-avatar>
                                    <v-img src="../assets/logo.png"  alt="WeJapa Logo"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title > {{ job.title  }} </v-list-item-title>
                                <v-list-item-subtitle > {{ job.type  }} </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-icon color="grey">mdi-briefcase</v-icon> 
                                    <v-list-item-action-text > &#36;700 </v-list-item-action-text> 
                                </v-list-item-action>
                            </v-list-item> 
                        </v-list>
                    </v-col>
                </v-row>
            </v-container>  

        </v-card>
        <v-dialog v-model="dialog" max-width="500px"> 
            <v-card>
              <v-card-title> 
              </v-card-title>

              <v-card-text class="text-center">
                <div class="mb-6">
                  <v-avatar>
                    <img src="../assets/logo.png"  alt="WeJapa Logo" >
                  </v-avatar>
                </div>
                <div class="title font-weight-bold">
                  {{ singleJob.title }}
                </div>
                <span> {{ singleJob.location }}  </span>
                <div class="mb-12">
                  <v-chip :color="singleJob.status == 'Open' ? 'primary' : 'red' " dark> {{ singleJob.status }} </v-chip>
                </div>
                <v-container>
                  <v-row>
                    <v-col sm="3" class="grey mr-1 lighten-4 colRadius " >
                      <v-icon color="green"> mdi-alarm </v-icon>
                      <div class="mt-3 black--text" > {{ singleJob.hoursPerWeek }} hr /wk </div>
                    </v-col> 
                    <v-col sm="3" class="grey mr-1 lighten-4 colRadius" >
                      <v-icon color="green"> mdi-briefcase </v-icon>
                      <div class="mt-3 black--text"> {{ singleJob.type }} </div>
                    </v-col> 
                    <v-col sm="3" class="grey lighten-4 colRadius" >
                      <v-icon color="green"> mdi-currency-usd </v-icon>
                      <div class="mt-3 black--text"> &#36; {{ singleJob.salary.toLocaleString() }} </div>
                    </v-col> 
                  </v-row>
                </v-container>

                <div class="mt-6">
                  <v-tabs v-model="tab" background-color="transparent" color="primary"  grow >
                    <v-tab v-for="explain in jobExplainations" :key="explain" >
                      {{ explain }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="explain in jobExplainations" :key="explain" >
                      <v-card  flat >  
                        <v-card-text v-if="explain == 'Description'"> {{ singleJob.description }}  </v-card-text>
                        <v-card-text v-else-if="explain == 'Benefits'"> {{ singleJob.benefits.toString() }} </v-card-text>
                        <v-card-text v-else-if="explain == 'Experience'"> {{ singleJob.experience }}  </v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </v-card-text>

              

              <v-card-actions>  
                <v-btn color="blue darken-1" class="white--text" light block rounded :disabled="singleJob.status == 'Open' ?  false : true"  @click="bid">
                  {{ singleJob.status == 'Open' ?  'Bid' : 'Job SuccessFully Saved'  }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    </div>
</template>

<style scoped>
    .borderBottom{
        border-bottom: 1px solid grey;
    }
    .v-slide-group{
        display: inline;
    }
</style>


<script>
import { mapGetters, mapActions  } from 'vuex'

export default {
    name: 'mobile-Vue',
     computed: { 
      ...mapGetters([
        'jobs'
      ]),
      searchJobs: function(){ 
        if (this.jobs) {
          
          return this.jobs.filter((job)=>{
            return job.title.toLowerCase().match(this.search.toLowerCase())
          })
        }
      },
      searchFilteredJobs: function(){ 
        return this.filteredJobs.filter((job)=>{
          return job.title.toLowerCase().match(this.search.toLowerCase())
        })
      }
    }, 
    data() {
        return {
            search: '',
            dialog: false,
            tab: null,
            jobExplainations: [
                'Description', 'Benefits', 'Experience',
            ], 
            singleJob: {
                type: "",
                benefits:  [],
                _id: "",
                status: "",
                hoursPerWeek: 40,
                title: "",
                experience: "",
                salary: 1500,
                location: "",
                description: "",
                createdAt: "",
                updatedAt: "",
                __v: 0
            }, 
            filteredJobs: [],
            filterActive: false
        }
    },
    methods: {
        bid(){
            const _ = this; 
            _.bidJob(_.singleJob) 
            this.dialog = false
        }, 
        preview(val){ 
            this.singleJob = val;
            this.dialog = true;
        },
        filterJob(){
          const _ = this;
          _.filteredJobs = []
          _.jobs.forEach(job => {
            if (job.status == 'Open') {
              _.filteredJobs.push(job)
            }
          }) 
            _.filterActive = !_.filterActive
        }, 
    },
}
</script>