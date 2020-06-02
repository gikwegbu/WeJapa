<template>
    <div>
        <div>
            <h1 class="headline">Hi, {{ profileName  }}</h1>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-card>
                        <v-card-title class="justify-center">
                            Available Jobs
                        </v-card-title>
                        <v-divider class="mx-12" inset  ></v-divider>
                        <v-card-text class="text--primary text-center"> 
                            {{ availJob  }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card>
                        <v-card-title class="justify-center">
                            Completed Jobs
                        </v-card-title>
                        <v-divider class="mx-12" inset  ></v-divider>
                        <v-card-text class="text--primary text-center">
                             {{ uuAvailJob  }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card>
                        <v-card-title class="justify-center">
                            Bids
                        </v-card-title>
                        <v-divider class="mx-12" inset  ></v-divider>
                        <v-card-text class="text--primary text-center">
                            {{ bids  }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div class="d-none d-sm-block">
            <JobList />
        </div>
        <div class="d-sm-none">
            <MobileJobList />
        </div>
    </div>
</template>

<script>
import JobList from '../components/JobTable'
import MobileJobList from '../components/JobMobile'
import { mapGetters, mapActions  } from 'vuex'
export default {
    name: 'Job-Listing',
    components: {
        JobList,
        MobileJobList,
    },
    computed: {
        ...mapGetters(['jobs', 'bids', 'profile', ]),
        num(){
            return this.jobs ?  this.jobs.length : 0
        },
        profileName(){
           return this.profile.name.split(' ')[0]  
        },
        availJob(){ 
            return this.jobs ?  this.jobs.filter(job => job.status == 'Open').length : 0
        },
        uuAvailJob(){ 
            return this.jobs ?  this.jobs.filter(job => job.status == 'Closed').length : 0
        }, 
    },
    data(){
        return { 
        }
    },  
    methods: {
        ...mapActions([
            'bidJob',
            'completedJobs',
        ]), 
    },
}
</script>