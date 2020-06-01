export default {
    profile(state){
        return state.developer.data.developer
    },
    token(state) {
       return state.developer.data.token
    },
    jobs(state){
        return state.jobs[0]
    },
    bids(state){
        return state.bids.length
    },
}