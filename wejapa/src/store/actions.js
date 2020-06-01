export default {
    logUser( {commit}, payload){
        commit('logUser', payload)
    },
    loadStateJobs( {commit}, payload){
        commit('loadStateJobs', payload)
    },
    bidJob( {commit}, payload){
        commit('bidJob', payload) 
    },
}