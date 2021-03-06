import router from '@/router';
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistateState from "vuex-persistedstate";

Vue.use(Vuex)

const REST_API = `http://localhost:9999/jungfit`

export default new Vuex.Store({
    plugins: [createPersistateState()],
    state: {
        videos: [],
        a: [],
        b: [],
        c: [],
        d: [],
        selectedVideo: [],
        partVideos: [],
        p1: [],
        p2: [],
        p3: [],
        p4: [],
        selectedReview: [],
        detailReview: [],
        newVReview: [],
        reviews: [],
        user: "", // 유저 아이디
        member: "", //멤버(팔로워) 아이디 (남)
        isfollower: false,
        isLogin: false,
        manager: "",
        adminLogin: false,
        userInfo: [], // 유저 객체
        userReviews: [],
        mails: [],
        mail: [],
        followers: [],
        trainerVideo: [],
        language: false,
    },
    getters: {},
    mutations: {
        MANAGER_LOGIN(state, value) {
            state.manager = value
            state.adminLogin = true
                // console.log(state.adminLogin)

        },
        MANAGER_LOGOUT(state) {
            sessionStorage.clear()
            state.manager = ""
            state.adminLogin = false
        },
        GET_USER_INFO(state, value) {
            state.userInfo = value.data
                // console.log(value.data)
        },
        USER_LOGIN(state, value) {
            console.log(value)
            state.user = value
            state.isLogin = true
                // console.log(state.isLogin)
        },
        USER_LOGOUT(state) {
            sessionStorage.clear()
            state.user = ""
            state.isLogin = false
        },
        USER_SIGN_IN(state) {
            state
        },
        GET_USER_MESSAGES(state, value) {
            // console.log(value)
            state.mails = value
                // console.log(state.mails)
        },
        READ_MAIL(state, value) {
            state.mail = value
        },
        SEND_EMAIL(state) {
            state
        },
        GET_USER_REVIEWS(state, value) {
            state.userReviews = value
        },
        USER_VREVIEW_DETAIL(state, value) {
            // console.log(value)
            state.detailReview = value
        },
        GET_FOLLOWER(state, value) {
            state.followers = value
        },
        GO_FOLLOWER_PAGE(state, value) {
            // console.log(value)
            state.member = value.myId
            // console.log(state.member)
        },
        FOLLOW_MEMBER(state, value) {
            state
            console.log(value)
            state.isfollower = true
        },
        UNFOLLOW_MEMBER(state) {
            state.isfollower = false
        },
        GET_YOUTUBE_LIST(state, value) {
            state.videos = value
            state.a = [value[0], value[1], value[2]]
            state.b = [value[3], value[4], value[5]]
            state.c = [value[6], value[7], value[8]]
            state.d = [value[9], value[10], value[11]]
        },
        GET_PART_LIST(state, value) {

            state.partVideos = value
            state.p1 = [value[0], value[1], value[2]]
            state.p2 = [value[3], value[4], value[5]]
            state.p3 = [value[6], value[7], value[8]]
            state.p4 = [value[9], value[10], value[11]]
        },
        GET_VREVIEW_LIST(state, value) {
            state.selectedReview = value
                // console.log(value)
        },
        GET_VREVIEW_VIDEO(state, value) {
            state.selectedVideo = [];
            state.videos.forEach(v => {
                if (v.id.videoId === value) {
                    state.selectedVideo.push(v)
                }
            })
            state.partVideos.forEach(v => {
                if (v.videoId === value) {
                    state.selectedVideo.push(v)
                }
            })
        },
        GET_VREVIEW_DETAIL(state, value) {
            // state.detailReview = [];
            state.detailReview = value;
            // console.log(state.detailReview)
        },
        CREATE_VREVIEW(state, value) {
            state.reviews.push(value)
        },
        UPDATE_VREVIEW(state, value) {
            state
            console.log(value)
        },
        GET_TRAINER_VIDEO(state, value) {
            state.trainerVideo = value
            // console.log(value)
        },
        CHANGE_LANGUAGE(state, value) {
            state.language = value
            console.log("이건 state"+state.language)
        }


    },
    actions: {
        managerLogin({ commit }, value) {
            let params = null
            let admin = value.managerId
            console.log(value)
            if (value) { //들어오는 payload가 있다면
                params = value //params는 payload로
            }
            const API_URL = `${REST_API}/admin/manager`
            axios({
                url: API_URL,
                method: 'POST',
                params, //그걸 같이 넘겨줘
            }).then((res) => {
                // console.log(res)
                commit('MANAGER_LOGIN', admin)
                sessionStorage.setItem("access-token", res.data["access-token"])
                router.push({ name: 'ManagerView' })
            })
        },
        managerLogout({ commit }) {
            const API_URL = `${REST_API}/admin/manager`
            axios({
                url: API_URL,
                method: 'GET',
            }).then(() => {
                commit('MANAGER_LOGOUT')
                router.push({ name: 'home' })
            }).catch((err) => {
                console.log(err)
            })
        },
        getUserInfo({ commit }, value) {
            let params = null
            if (value) { //들어오는 payload가 있다면
                params = value //params는 payload로
            }
            const API_URL = `${REST_API}/jung/user/getinfo/` + params
            console.log(API_URL)

            axios({
                url: API_URL,
                method: 'GET',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                }
            }).then((res) => {
                console.log(res)
                commit('GET_USER_INFO', res)
            }).catch((err) => {
                console.log(err)
            })
        },
        userLogin({ commit }, value) {
            let params = null
            let id = value.userId
            if (value) { //들어오는 payload가 있다면
                params = value //params는 payload로
            }
            const API_URL = `${REST_API}/jung/user`
            axios({
                url: API_URL,
                method: 'POST',
                params, //그걸 같이 넘겨줘
            }).then((res) => {
                commit('USER_LOGIN', id)
                sessionStorage.setItem("access-token", res.data["access-token"])
                router.push({ name: 'home' })
            }).catch((err) => {
                console.log(err)
            })
        },
        userLogout({ commit }) {

            const API_URL = `${REST_API}/jung/user`
            axios({
                url: API_URL,
                method: 'GET',
            }).then(() => {
                commit('USER_LOGOUT')
                router.push({ name: 'home' })
            }).catch((err) => {
                console.log(err)
            })
        },
        getUserMessages({ commit }, value) {
            console.log(value)
            let params = null
            if (value) { //들어오는 payload가 있다면
                params = value //params는 payload로
            }
            const API_URL = `${REST_API}/mailbox/message/list/` + params
            console.log(API_URL)

            axios({
                url: API_URL,
                method: 'GET',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                }
            }).then((res) => {
                console.log(res)
                commit('GET_USER_MESSAGES', res.data)
            }).catch((err) => {
                console.log(err)
            })
        },
        readMail({ commit }, value) {
            // console.log(value)
            let params = null
            if (value) { //들어오는 payload가 있다면
                params = value //params는 payload로
            }
            const API_URL = `${REST_API}/mailbox/message/` + params.no

            axios({
                url: API_URL,
                method: 'GET',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                }
            }).then((res) => {
                console.log(res)
                commit('READ_MAIL', value)
                router.push({ name: 'MailDetail' })
            }).catch((err) => {
                console.log(err)
            })
        },
        sendEmail({ commit }, value) {
            // console.log(value)
            let params = null
            if (value) { //들어오는 payload가 있다면
                params = value //params는 payload로
            }
            const API_URL = `${REST_API}/mailbox/message/send`
                // console.log(API_URL)

            axios({
                url: API_URL,
                method: 'POST',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                }
            }).then((res) => {
                console.log(res)
                commit('SEND_EMAIL')
                router.go(-1)
            }).catch((err) => {
                console.log(err)
            })

        },
        userSignin({ commit }, value) {
            let params = null

            if (value) { //들어오는 value가 있다면
                params = value //params는 value로
            }
            const API_URL = `${REST_API}/jung/user/join`
            axios({
                url: API_URL,
                method: 'POST',
                params,
            }).then(() => {
                commit('USER_SIGN_IN')
                router.push({ name: 'home' })
            }).catch((err) => {
                console.log(err)
            })
        },
        getUserReviews({ commit }, value) {
            let params = null
            if (value) { //들어오는 value가 있다면
                params = value //params는 value로
            }
            const API_URL = `${REST_API}/review/video-review/loginuser/` + params
                // console.log(API_URL)
            axios({
                url: API_URL,
                method: 'GET',
                params,
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then((res) => {
                console.log(res)
                commit('GET_USER_REVIEWS', res.data)

            }).catch((err) => {
                console.log(err)
            })
        },
        userReviewDetail({ commit }, value) {
            // console.log(value)
            let params = null

            if (value) {
                params = value
            }
            const API_URL = `${REST_API}/review/video/` + params
            axios({
                url: API_URL,
                method: 'GET',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then((res) => {
                console.log(res)
                    commit('USER_VREVIEW_DETAIL', res.data)
                    router.push("/user/mypage/review/" + res.data.reviewId)
            }).catch((err) => {
                console.log(err)
            })
        },
        goFollowerPage({commit}, value) {
            commit('GO_FOLLOWER_PAGE', value)
        },
        getPartList({ commit }, value) {
            let params = null

            if (value) { //들어오는 value가 있다면
                params = value //params는 value로
            }
            const API_URL = `${REST_API}/video/list/part/` + params
            axios({
                url: API_URL,
                method: 'GET',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                }
            }).then((res) => {
                commit('GET_PART_LIST', res.data)
            }).catch((err) => {
                console.log(err)
            })
        },
        getYoutubeList({ commit }, value) {
            const YOUTUBE_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
            const API_URL = `https://www.googleapis.com/youtube/v3/search`
            const params = {
                key: YOUTUBE_KEY,
                part: 'snippet',
                type: 'video',
                q: value,
                maxResults: 12
            }

            axios({
                url: API_URL,
                method: 'GET',
                params: params,
            })

            .then((res) => {
                commit("GET_YOUTUBE_LIST", res.data.items)
            })

            .catch((err) => {
                console.log(err)
                console.log("유투브 에러남")
            })
        },
        getVReviewList({ commit }, value) {
            let params = null
            let API_URL = `${REST_API}/review/video-review/`
            
            if (!value.keyword) {
                API_URL += value
                params = value
                console.log(value)
            } else {
                API_URL += value.videoId
                params = value
            }
            console.log(API_URL)
            console.log(params)

            axios({
                url: API_URL,
                method: 'GET',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then((res) => {
                console.log(res)
                commit('GET_VREVIEW_LIST', res.data)
                    // router.push(`videoId`)
            }).catch((err) => {
                console.log(err)
            })
        },
        getVReviewVideo({ commit }, value) {
            commit('GET_VREVIEW_VIDEO', value)
        },
        getVReviewDetail({ commit }, value) {
            // console.log(value)
            let params = null

            if (value) {
                params = value
            }
            const API_URL = `${REST_API}/review/video/` + params
            axios({
                url: API_URL,
                method: 'GET',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                }
            }).then((res) => {
                // console.log(res)
                if (res.data)
                    commit('GET_VREVIEW_DETAIL', res.data)
            }).catch((err) => {
                console.log(err)
            })
        },
        createVReview({ commit }, value) {
            console.log(value)
            let params = null
            if (value) {
                params = value
            }
            const API_URL = `${REST_API}/review/video/`

            axios({
                url: API_URL,
                method: 'POST',
                params,
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                }
            }).then(() => {
                commit('CREATE_VREVIEW', params)
                router.push("/review/video-review/" + params.videoId)
            }).catch((err) => {
                console.log(err)
            })
        },
        deleteVReview(context, value) {
            // console.log(value)
            context //버림
            let params = null
            if (value) {
                params = value
            }
            const API_URL = `${REST_API}/review/video/` + params.reviewId
            axios({
                url: API_URL,
                method: 'DELETE',
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then(() => {
                console.log("del success")
                router.push("/review/video-review/" + params.videoId)
            }).catch((err) => {
                console.log(err)
                console.log('delete에러')

            })
        },
        deleteMyReviewDetail({commit}, value) {
            commit
            console.log(value)
            let params = null
            if (value) {
                params = value
            }
            const API_URL = `${REST_API}/review/video/` + params.reviewId
            axios({
                url: API_URL,
                method: 'DELETE',
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then(() => {
                console.log("del success")
                router.push({name:"MyPage"})
            }).catch((err) => {
                console.log(err)
                console.log('delete에러')

            })
        },
        updateMyReview({ commit }, value) {
            console.log(value)
            let params = null
            if (value) {
                params = value
            }
            const API_URL = `${REST_API}/review/video/` + params.reviewId
            axios({
                url: API_URL,
                method: 'PUT',
                params,
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then(() => {
                commit('UPDATE_VREVIEW', params)
                router.push({name: "MyreviewDetail"})
            }).catch((err) => {
                console.log(err)
            })
           
        },
        updateVReview({ commit }, value) {
            let params = null
            if (value) {
                params = value
            }
            const API_URL = `${REST_API}/review/video/` + params.reviewId

            axios({
                url: API_URL,
                method: 'PUT',
                params,
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then(() => {
                commit('UPDATE_VREVIEW', params)
                router.push("/review/video-review/" + params.videoId)
            }).catch((err) => {
                console.log(err)
            })
        },
        getFollower({ commit }, value) {
            // console.log(value)
            let params = null
            if (value) {
                params = value
            }
            console.log(params)
            const API_URL = `${REST_API}/follower/follow/follower/` + params
            axios({
                url: API_URL,
                method: 'GET',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then((res) => {
                console.log(res)
                commit('GET_FOLLOWER', res.data)
            }).catch((err) => {
                console.log(err)
            })
        },
        followingMember({commit}, value) {
            let params = null
            if (value) {
                params = value
            }

            const API_URL = `${REST_API}/follower/follow`
            axios({
                url: API_URL,
                method: 'POST',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then((res) => {
                console.log(res)
                commit('FOLLOW_MEMBER', res.data)
                router.go(0)
            }).catch((err) => {
                console.log(err)
            })
        },
        unFollowingMember({commit}, value) {
            
            let params = null
            if (value) {
                params = value
            }

            const API_URL = `${REST_API}/follower/follow`
            axios({
                url: API_URL,
                method: 'DELETE',
                params, //그걸 같이 넘겨줘
                headers: {
                    "access-token": sessionStorage.getItem("access-token")
                },
            }).then(() => {
                console.log("delete success")
                commit('UNFOLLOW_MEMBER')
                router.go(0)
            }).catch((err) => {
                console.log(err)
            })
        },
        getTrainerVideo({ commit }, value) {
            commit
            let params = null
            if (value) {
                params = value
            }
            // console.log(params)
            const API_URL = `${REST_API}/video/list/trainer-info/` + params
            axios({
                url: API_URL,
                method: 'GET',
                params, //그걸 같이 넘겨줘
            }).then((res) => {
                // console.log(res)
                commit('GET_TRAINER_VIDEO', res.data)
            }).catch((err) => {
                console.log(err)
            })
        },
        changeLanguage({commit}, value) {
            commit(`CHANGE_LANGUAGE`, value)
        }

    },
    modules: {}
})