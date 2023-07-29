import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    /**
     * 是否需要强制登录
     */
	state: {
		forcedLogin: false, // 强制登录
        hasLogin: false, // 是否已登录
        userName: uni.getStorageSync('username')||"", // 用户名称
		univerifyErrorMsg: "", // 错误提示
		hideUniverify: true, // 隐藏验证
        uni_id_token: false // 登录凭证
	},
    actions: {
        myLogin(user) {
            console.log('调用云函数前');
            uniCloud.callFunction({
                name: 'user-center',
                data: {
                    action: 'login',
                    params: user
                },
                success: (res) => {
                    console.log(res,'myLogin');

                    // if (res.result.code == 0) {
                    //     this.needCaptcha = false;
                    //     uni.setStorageSync('uni_userInfo', res.result.userInfo)
                    //     uni.setStorageSync('uni-needCaptcha', this.needCaptcha)
                    //     uni.setStorageSync('uni_id_token', res.result.token)
                    //     uni.setStorageSync('username', res.result.username)
                    //     uni.setStorageSync('login_type', 'online')
                    //     uni.setStorageSync('uni_id_has_pwd', true)
                    //     this.toMain(this.username);
                    // } else {
                    //     uni.showModal({
                    //         content: res.result.message,
                    //         showCancel: false
                    //     })
                    //     this.needCaptcha = res.result.needCaptcha;
                    //     uni.setStorageSync('uni-needCaptcha', this.needCaptcha)
                    //     if (this.needCaptcha) {
                    //         this.captcha('createCaptcha')
                    //     }
                    // }
                },
                fail: (e) => {

                },
                complete: () => {

                }
            })
        },
    },
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
            // 同步清理本地数据缓存。
            uni.clearStorageSync()
			state.hasLogin = false;
		},
		setUniverifyErrorMsg(state, payload = '') {
			state.univerifyErrorMsg = payload
		},
		setHideUniverify(state, payload = false) {
			state.hideUniverify = payload
		}
	}
})

export default store
