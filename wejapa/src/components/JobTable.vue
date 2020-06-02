<template>
  <div class="mt-12"> 
    <!-- <v-data-table :headers="headers" :search="search" :items="desserts" sort-by="calories" class="elevation-1" > -->
    <v-data-table :headers="headers" :search="search" :items="jobs[0]" sort-by="status" class="elevation-1" >
      <template #item.status="{ value }"  >
         <v-chip class="ma-2" :color=" value == 'Open' ? 'primary' : 'default' " >
            {{ value }} 
        </v-chip>
      </template>
      <template v-slot:item.salary="{ value }">
          <span class="green--text">
             &#36;  {{parseInt(value).toLocaleString()}}
          </span>
       </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field v-model="search" append-icon="search" label="Search" light single-line hide-details ></v-text-field>
         
          <v-dialog v-model="dialog" max-width="500px"> 
            <v-card>
              <v-card-title> 
              </v-card-title>

              <v-card-text class="text-center">
                <div class="mb-6">
                  <v-avatar size="50"> 
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
                    <v-col sm="3" class="grey mr-12 lighten-4 colRadius " >
                      <v-icon color="green"> mdi-alarm </v-icon>
                      <div class="mt-3 black--text" > {{ singleJob.hoursPerWeek }} hr /wk </div>
                    </v-col> 
                    <v-col sm="3" class="grey mr-12 lighten-4 colRadius" >
                      <v-icon color="green"> mdi-briefcase </v-icon>
                      <div class="mt-3 black--text"> {{ singleJob.type }} </div>
                    </v-col> 
                    <v-col sm="3" class="grey mr-3 lighten-4 colRadius" >
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
                <v-btn color="primary" class="white--text" light block rounded :disabled="singleJob.status == 'Open' ?  false : true"  @click="bid">
                  {{ singleJob.status == 'Open' ?  'Bid' : 'Job SuccessFully Saved'  }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="jobDetail(item)" color="primary" >
          mdi-eye-plus
        </v-icon> 
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" >Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style >
  .colRadius{
    border-radius: 10px;
  }
</style>


<script>
import { mapState, mapActions  } from 'vuex'
  export default {

    data: () => ({
      dialog: false,
      search: '',
      headers: [
        { text: 'Name', align: 'start', sortable: false, value: 'title', },
        { text: 'Type', value: 'type' , sortable: false,}, 
        { text: 'Hours', value: 'hoursPerWeek' },
        { text: 'Experience', value: 'experience' , sortable: false,},
        { text: 'Salary', value: 'salary' }, 
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ], 
      desserts: [],
      jobIndex: -1,
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
      tab: null,
      jobExplainations: [
        'Description', 'Benefits', 'Experience',
      ], 
    }),

    computed: { 
      ...mapState([
        'jobs'
      ])
    }, 

    created () { 
      // console.log(this.jobs)
    },

    methods: {
      ...mapActions([
        'bidJob'
      ]),
      
      dateFormat(date){
        return new Date(date).toGMTString()
      },

      jobDetail (item) {
        this.jobIndex = this.desserts.indexOf(item)
        this.singleJob = Object.assign({}, item)
        this.dialog = true
      }, 
      bid(){
        const _ = this; 
        _.bidJob(_.singleJob) 
         this.dialog = false
      }, 

      save () {
        if (this.jobIndex > -1) {
          Object.assign(this.desserts[this.jobIndex], this.singleJob)
        } else {
          this.desserts.push(this.singleJob)
        }
        this.close()
      },
    },
  }
</script>