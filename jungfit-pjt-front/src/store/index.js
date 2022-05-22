import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        videos: [],
    },
    getters: {},
    mutations: {},
    actions: {
        getPartList({ commit }, value) {
            const YOUTUBE_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
            const API_URL = `https://www.googleapis.com/youtube/v3/search`
            const params = {
                key: YOUTUBE_KEY,
                part: 'snippet',
                type: 'video',
                q: value,
                maxResults: 10
            }

            axios({
                url: API_URL,
                method: 'GET',
                params: params,
            })

            .then((res) => {
                commit("SEARCH_YOUTUBE", res.data.items)
                console.log(res.data.items)
            })

            .catch((err) => {
                console.log(err)
                console.log("에러남")
            })
        },
    },
    modules: {}
})