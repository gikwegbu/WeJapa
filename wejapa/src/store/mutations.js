export default {
    logUser( state, payload){
        state.developer = payload
    },
    loadStateJobs( state, payload){ 
        state.jobs.push( payload )
    },
    bidJob( state, payload){
        state.bids.push(payload)
    },
}