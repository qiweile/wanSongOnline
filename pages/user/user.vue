<template>
    <view class="user">
        <view class="bg-title">个人中心</view>
        <view class="bg-main u-p-l-20 u-p-r-20">
            <view class="u-flex" @click="profile">
                <view class="u-flex u-flex-col u-m-r-20" @click="toEdit">
                    <u--image :showLoading="true" :src="avatar" width="80px" height="80px" shape="circle"></u--image>
                    <view class="u-font-12 u-p-t-10">编辑资料</view>
                </view>
                <view class="u-flex-1" @click="login">
                    <view class="u-font-18 u-p-b-20">Hi，{{ hasLogin ? userName : '您未登录' }}</view>
                    <view class="u-flex u-col-center u-m-b-30">
                        去认证，解锁平台全部功能
                        <u-icon size="14" color="#FFF" name="arrow-right"></u-icon>
                    </view>
                </view>
            </view>
            <view class="center-nav u-m-t-40">
                <u-row>
                    <u-col span="2.2" text-align="center" v-for="(item, index) in navList1" :key="index">
                        <view>
                            <view class="tabNum">{{ item.num }}</view>
                            <view class="tabName">{{ item.name }}</view>
                        </view>
                    </u-col>
                </u-row>
            </view>
        </view>
        <view class="navCell">
            <view class="section">
                <view class="section-title">
                    <u-image width="46rpx" height="40rpx" :src="ic_collect"></u-image>
                    <text class="u-m-l-20 u-font-14">我的收藏</text>
                </view>
                <view class="section-right">
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <view class="section" @click="toInvite">
                <view class="section-title">
                    <u-image width="40rpx" height="40rpx" :src="ic_vip"></u-image>
                    <text class="u-m-l-20 u-font-14">邀请好友</text>
                </view>
                <view class="section-right">
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <view class="section" @click="goto">
                <view class="section-title">
                    <u-image width="40rpx" height="40rpx" :src="ic_vip"></u-image>
                    <text class="u-m-l-20 u-font-14">修改密码</text>
                </view>
                <view class="section-right">
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <view class="section">
                <view class="section-title">
                    <u-image width="46rpx" height="46rpx" :src="ic_shezhi"></u-image>
                    <text class="u-m-l-20 u-font-14">设置</text>
                </view>
                <view class="section-right">
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <view class="btn-row">
                <button v-if="hasLogin" class="primary" type="primary" :loading="logoutBtnLoading"
                    @tap="logOut">退出登录</button>
            </view>
        </view>
    </view>
</template>

<script>
/*
    uni.navigateTo: 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
*/
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            // http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg
            avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
            pic: "",
            // show:true,
            ic_shiming:
                "https://api.citymiai.com/media/common/images/ic_shiming.png",
            navList1: [
                { name: "红线", num: "0" },
                { name: "桃花", num: "20" },
                { name: "谁看过我", num: "9" },
                { name: "谁收藏我", num: "1" },
                { name: "资料完成", num: "79%" },
            ],
            navList2: [
                {
                    name: "身份",
                    pic: "https://api.citymiai.com/media/common/images/identify_icon_name.png",
                },
                {
                    name: "学历",
                    pic: "https://api.citymiai.com/media/common/images/identify_icon_education.png",
                },
                {
                    name: "工作",
                    pic: "https://api.citymiai.com/media/common/images/identify_icon_work.png",
                },
                {
                    name: "车产",
                    pic: "https://api.citymiai.com/media/common/images/identify_icon_house.png",
                },
                {
                    name: "房产",
                    pic: "https://api.citymiai.com/media/common/images/identify_icon_car.png",
                },
            ],
            ic_collect:
                "https://api.citymiai.com/media/common/images/ic_collect.png",
            ic_dynamic:
                "https://api.citymiai.com/media/common/images/ic_dynamic.png",
            ic_peach:
                "https://api.citymiai.com/media/common/images/ic_peach.png",
            ic_shezhi:
                "https://api.citymiai.com/media/common/images/ic_shezhi.png",
            ic_right:
                "https://api.citymiai.com/media/common/images/ic_right.png",
            ic_kefu: "https://api.citymiai.com/media/common/images/ic_kefu.png",
            ic_vip: "https://api.citymiai.com/media/common/images/ic_vip.png",
            logoutBtnLoading: false,
        };
    },
    computed: {
        ...mapState(['hasLogin', 'forcedLogin', 'userName'])
    },
    onLoad() {

    },
    methods: {
        // 获取的代码==status
        ...mapMutations(['logout']),
        /**
         * @todo 头像裁剪
         */
        /**
         * @todo 登录
         */
        login() {
            if(this.hasLogin) return
            uni.showModal({
                title: "去登录",
                content: "跳转的登录页面，是否继续？",
                success: (res) => {
                    if (res.confirm) {
                        uni.reLaunch({ url: "../login/login" });
                    }
                }
            })
        },
        /**
         * @todo 退出
         */
        logOut() {
            const loginType = uni.getStorageSync('login_type')
            if (loginType === 'online') {
                this.logout();
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
                return
            }
            this.logoutBtnLoading = true
            uniCloud.callFunction({
                name: 'user-center',
                data: {
                    action: 'logout'
                },
                success: (e) => {
                    if (e.result.code == 0) {
                        this.logout();
                        /**
                         * 如果需要强制登录跳转回登录页面
                         */
                        if (this.forcedLogin) {
                            uni.reLaunch({
                                url: '../login/login',
                            });
                        }
                    } else {
                        uni.showModal({
                            content: e.result.msg,
                            showCancel: false
                        })
                    }
                },
                fail: (e) => {
                    uni.showModal({
                        content: JSON.stringify(e),
                        showCancel: false
                    })
                },
                complete: () => {
                    this.logoutBtnLoading = false
                }
            })
        },
        /**
         * @todo 编辑资料
         */
        toEdit() {
            uni.switchTab({
                url: '../release/release'
            })
        },
        // 邀请好友
        toInvite() {
            uni.navigateTo({
                url: '../invite/invite'
            })
        },
        // 修改密码
        goto() {
            uni.navigateTo({
                url: '../pwd/update-password'
            })
        },
        profile() {
            this.$u.route("/pages/profile/profile");
        },
        setting() {
            this.$u.route("/pages/profile/setting");
        },
        scan() {
            console.log("begin scan");
            // 允许从相机和相册扫码
            uni.scanCode({
                success: function (res) {
                    console.log("条码类型：" + res.scanType);
                    console.log("条码内容：" + res.result);
                },
            });
        },
        //拨打固定电话
        callPhoneNumber() {
            uni.makePhoneCall({
                phoneNumber: "18720989281",
            });
        },
        problem() {
            this.$u.route({
                url: "pages/login/problem",
            });
        },
        // 关于作者
        aboutMe() {
            uni.navigateTo({
                url: "../me/aboutMe",
            });
        },
        clickNav() {
            uni.makePhoneCall({
                phoneNumber: "18720989281",
            });
        },
    },
};
</script>

<style lang="scss">
.user {
    width: 100%;

    .bg-title {
        background-color: #fe3ea5;
        text-align: center;
        color: #ffffff;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
    }

    .bg-main {
        background-color: #fe3ea5;
        background: linear-gradient(to bottom, #fe3ea5, #ee7e59);
        height: 350rpx;
        color: #ffffff;
        border-radius: 0 0 30px 30px;

    }

    .navCell {
        background-color: #ffffff;
        border-radius: 10px;
        margin: 0rpx 30rpx 30rpx 30rpx;
        padding: 0 30rpx 0 30rpx;

        .section {
            padding-top: 20rpx;
            border-bottom: 1px solid #ecf1fa;
            padding-bottom: 20rpx;
            display: flex;
            justify-content: space-between;

            .section-title {
                font-size: 32rpx;
                color: #303133;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .section-right {
                font-size: 28rpx;
                color: #909399;
            }
        }
    }
}
</style>
