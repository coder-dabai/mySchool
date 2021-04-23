import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		userInfo:''
	},
    mutations: {
		setuser:(state,userInfo)=>{
			state.userInfo = userInfo
			//sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
			uni.setStorage({
			    key: 'userInfo',
			    data: JSON.stringify(userInfo),
			    success: function () {
			        console.log('success');
			    }
			});
		}
	},
    actions: {}
})
export default store