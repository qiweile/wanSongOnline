<template>
    <view class="release">
        <view class="content">
            <view class="u-demo-block__content">
                <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
                <u--form labelPosition="left" :model="formData" ref="form">
                    <u-form-item label="昵称" prop="nickname" borderBottom ref="nickname">
                        <u--input v-model="formData.nickname" border="none" placeholder="请输入昵称"></u--input>
                    </u-form-item>
                    <u-form-item label="性别" prop="gender" borderBottom @click="
                        showSex = true;
                    hideKeyboard();
                    ">
                        <u--input v-model="formData.gender" disabled disabledColor="#ffffff" placeholder="请选择性别"
                            border="none"></u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item label="电话" prop="mobile" borderBottom>
                        <u--input v-model="formData.mobile" maxlength="11" border="none" placeholder="请输入电话"></u--input>
                    </u-form-item>
                    <u-form-item label="生日" prop="birthday" borderBottom @click="
                        showBirthday = true;
                    hideKeyboard();
                    ">
                        <u--input v-model="formData.birthday" disabled disabledColor="#ffffff" placeholder="请输入出生年月日"
                            border="none"></u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item label="身高" prop="height" borderBottom>
                        <u--input v-model="formData.height" border="none" placeholder="请输入身高(cm)"></u--input>
                    </u-form-item>
                    <u-form-item label="学历" prop="education" borderBottom @click="
                        showEducation = true;
                    hideKeyboard();
                    ">
                        <u--input v-model="formData.education" disabled disabledColor="#ffffff" placeholder="请选择学历"
                            border="none"></u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item label="单位" prop="unit" borderBottom>
                        <u--input v-model="formData.unit" border="none" placeholder="请输入单位"></u--input>
                    </u-form-item>
                    <u-form-item label="职业" prop="career" borderBottom>
                        <u--input v-model="formData.career" border="none" placeholder="请输入职业"></u--input>
                    </u-form-item>
                    <u-form-item label="收入" prop="income" borderBottom @click="
                        showIncome = true;
                    hideKeyboard();
                    ">
                        <u--input v-model="formData.income" disabled disabledColor="#ffffff" placeholder="请选择收入范围"
                            border="none"></u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item label="婚否" prop="marriage" borderBottom>
                        <u-radio-group v-model="formData.marriage">
                            <u-radio :customStyle="{ marginRight: '16px' }" v-for="(item, index) in marriageList"
                                :key="index" :label="item.name" :name="item.key">
                            </u-radio>
                        </u-radio-group>
                    </u-form-item>
                    <u-form-item label="简介" prop="comment" borderBottom>
                        <u--textarea placeholder="写写爱好特长啊等等" v-model="formData.comment" count></u--textarea>
                    </u-form-item>
                    <u-form-item label="照片" prop="file_fist" borderBottom>
                        <view class="u-demo-block">
                            <view class="u-demo-block__content">
                                <view class="u-page__upload-item">
                                    <u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="3"
                                        multiple :maxCount="10" :previewFullImage="true">
                                    </u-upload>
                                </view>
                            </view>
                        </view>
                    </u-form-item>
                </u--form>
                <u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="submit"></u-button>
                <u-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></u-button>
                <u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="" @close="showSex = false"
                    @select="sexSelect" />
                <u-action-sheet :show="showIncome" :actions="incomeActions" title="请选择收入范围" description=""
                    @close="showIncome = false" @select="selectIncome" />
                <u-action-sheet :show="showEducation" :actions="educationList" title="请选择学历" description=""
                    @close="showEducation = false" @select="selectEducation" />
                <u-datetime-picker :min-date="minDate" :max-date="maxDate" :show="showBirthday" :value="birthday"
                    mode="date" closeOnClickOverlay @confirm="birthdayConfirm" @cancel="showBirthday = false"
                    @close="showBirthday = false" />
            </view>
            <u-toast ref="uToast" />
        </view>
    </view>
</template>

<script>
import { toPage, guideToLogin, blockFun } from '@/common/utils.js'
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            userInfo: {},
            formData: {
                nickname: "", // 昵称
                unit: "", // 单位
                career: "", // 职业
                height: "", // 身高
                income: "", // 收入范围
                education: "", // 学历
                marriage: "", // 婚否
                birthday: "", // 生日 必填
                file_list: [], // 照片
                comment: "", // 简介
                mobile: "", // 电话
                gender: "", // 性别
            },
            fileList: [], // 照片
            birthday: Number(new Date((Number(uni.$u.timeFormat(new Date(), 'yyyy')) - 18) + '-' + uni.$u.timeFormat(new Date(), 'mm-dd'))), // 弹窗显示值
            minDate: Number(new Date("1950-01-01")), // 弹窗最小值
            maxDate: Number(new Date((Number(uni.$u.timeFormat(new Date(), 'yyyy')) - 18) + '-' + uni.$u.timeFormat(new Date(), 'mm-dd'))), // 弹窗最大值
            showSex: false, // 性别弹框
            actions: [{ name: "男" }, { name: "女" }],
            showIncome: false, // 收入范围弹框
            showEducation: false, // 学历弹窗显示
            showBirthday: false, // 显示生日
            incomeActions: [
                { name: "8000以下" },
                { name: "8000-12000" },
                { name: "12000-16000" },
                { name: "16000-20000" },
                { name: "20000-25000" },
                { name: "25000以上" },
            ],
            marriageList: [
                { name: "未婚", key: '0' },
                { name: "离异", key: '1' },
                { name: "丧偶", key: '2' },
            ],
            educationList: [
                { name: "小学", key: '0' },
                { name: "初中", key: '1' },
                { name: "高中", key: '2' },
                { name: "职高", key: '3' },
                { name: "中专", key: '4' },
                { name: "技校", key: '5' },
                { name: "专科", key: '6' },
                { name: "本科", key: '7' },
                { name: "硕士", key: '8' },
                { name: "博士", key: '9' },
            ],
            rules: {
                // 校验
                nickname: {
                    type: "string",
                    required: true,
                    message: "请输入昵称",
                    trigger: ["blur", "change"],
                },
                gender: {
                    type: "string",
                    max: 4,
                    required: true,
                    message: "请选择性别",
                    trigger: ["blur", "change"],
                },
                mobile: {
                    type: "string",
                    max: 11,
                    required: true,
                    message: "请输入电话",
                    trigger: ["blur", "change"],
                },
                birthday: {
                    type: "string",
                    max: 10,
                    required: true,
                    message: "请输入出生年月日",
                    trigger: ["blur", "change"],
                },
                height: {
                    type: "string",
                    max: 3,
                    required: true,
                    message: "请输入身高",
                    trigger: ["blur", "change"],
                },
                fileList: {
                    type: "array",
                    max: 3,
                    required: true,
                    message: "上传您的美照",
                    trigger: ["blur", "change"],
                },
            },
        };
    },
    computed: {
        ...mapState(["forcedLogin", "hasLogin", "userName"])
    },
    beforeCreate () {

        console.log(this.userInfo, 'HHH2');
        console.log('%c beforeCreate', 'color:#f00;font-size:20px;background:yellow')
    },
    onReady() {
        console.log('%c onReady','color:#f00;font-size:20px;background:yellow')
        // 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
        this.$refs.form.setRules(this.rules)
        this.userInfo = uni.getStorageSync('uni_userInfo')
        // console.log(this.userInfo, 'HHH2');
    },
    onShow() {
        console.log('%c onShow','color:#f00;font-size:20px;background:yellow')
        this.editUser()
    },
    onHide() {
        console.log('%c onHide','color:#f00;font-size:20px;background:yellow')
    },
    onUnload() {
        console.log('%c onUnload','color:#f00;font-size:20px;background:yellow')
    },
    onResize() {
        console.log('%c onResize','color:#f00;font-size:20px;background:yellow')
    },
    onPullDownRefresh() {
        console.log('%c onPullDownRefresh','color:#f00;font-size:20px;background:yellow')
    },
    onReachBottom() {
        console.log('%c onReachBottom','color:#f00;font-size:20px;background:yellow')
    },
    onTabItemTap() {
        console.log('%c onTabItemTap','color:#f00;font-size:20px;background:yellow')
    },
    onShareAppMessage() {
        console.log('%c onShareAppMessage','color:#f00;font-size:20px;background:yellow')
    },
    onPageScroll() {
        console.log('%c onPageScroll','color:#f00;font-size:20px;background:yellow')
    },
    onNavigationBarButtonTap() {
        console.log('%c onNavigationBarButtonTap','color:#f00;font-size:20px;background:yellow')
    },
    onBackPress() {
        console.log('%c onBackPress','color:#f00;font-size:20px;background:yellow')
    },
    onNavigationBarSearchInputChanged() {
        console.log('%c onNavigationBarSearchInputChanged','color:#f00;font-size:20px;background:yellow')
    },
    onNavigationBarSearchInputConfirmed() {
        console.log('%c onNavigationBarSearchInputConfirmed','color:#f00;font-size:20px;background:yellow')
    },
    onNavigationBarSearchInputClicked() {
        console.log('%c onNavigationBarSearchInputClicked','color:#f00;font-size:20px;background:yellow')
    },
    disabled() {
        console.log('%c disabled','color:#f00;font-size:20px;background:yellow')
    },
    onShareTimeline() {
        console.log('%c onShareTimeline','color:#f00;font-size:20px;background:yellow')
    },
    onAddToFavorites() {
        console.log('%c onAddToFavorites','color:#f00;font-size:20px;background:yellow')
    },
    methods: {
        // 性别
        sexSelect(e) {
            this.formData.gender = e.name;
            this.$refs.form.validateField("formData.gender");
        },
        // 收入
        selectIncome(e) {
            this.formData.income = e.name;
            this.$refs.form.validateField("formData.income");
        },
        // 学历
        selectEducation(e) {
            this.formData.education = e.name;
            this.$refs.form.validateField("formData.education");
        },
        // 生日
        birthdayConfirm(e) {
            this.showBirthday = false;
            this.formData.birthday = uni.$u.timeFormat(
                e.value,
                "yyyy-mm-dd"
            );
            this.$refs.form.validateField("formData.birthday");
        },
        /**
         * @todo 提交
         */
        async submit() {
            // 登录校验
            if (await blockFun(guideToLogin)) return
            // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
            this.$refs.form.validate().then((res) => {
                uniCloud.callFunction({
                    name: 'publish-message',
                    data: {
                        uid: this.userInfo._id,
                        params: { ...this.formData, isRel: true }
                    },
                }).then(res => {
                    let { result: { code, msg } } = res
                    if (code === 200) {
                        this.$refs.uToast.show({
                            type: 'success',
                            message: msg
                        })
                        setTimeout(() => {
                            toPage(3, '/pages/main/main')
                        }, 2000);
                    }
                })
            }).catch((errors) => {
                uni.$u.toast("校验失败");
            });
        },
        /**
         * 校验输入信息
         */
        reset() {
            const validateList = ['formData.name', 'formData.gender']
            this.$refs.form.resetFields()
            this.$refs.form.clearValidate()
            setTimeout(() => {
                this.$refs.form.clearValidate(validateList)
                // 或者使用 this.$refs.form.clearValidate()
            }, 10)
        },
        /**
         * @todo 编辑信息
         */
        async editUser() {
            if (!this.hasLogin) {
                guideToLogin()
                return
            }
            let user = uni.getStorageSync('uni_userInfo')
            console.log(user._id, 'HHH');
            uniCloud.callFunction({
                name: 'getUser',
                data: {
                    action: 'editUser',
                    uid: user._id
                }
            }).then(res => {
                let { code, data, msg } = res.result
                if (code === 200 && data.length > 0) {
                    let user = data[0]
                    if (this.userInfo) {
                        for (let key in this.formData) {
                            this.formData[key] = user[key]
                        }
                        this.fileList = user['file_list'].map(item => ({ status: "success", ...item }))
                    }
                }
            })
        },
        hideKeyboard() {
            uni.hideKeyboard();
        },
        /**
         * @todo 删除显示图片
         * @param {*} event
         */
        async deletePic(event) {
            this[`fileList`].splice(event.index, 1);
            this.formData.file_list.splice(event.index, 1)
        },
        /**
         * @todo 数据库图片删除(暂未实现)
         * @param {*} event
         */
        async deleteFileData(arr) {
            let ids = []
            const result = await uniCloud.callFunction({
                name: 'deleteFile',
                data: { fileIDs: ids }
            })
            // console.log(result);
        },
        // 新增图片
        async afterRead(event) {
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(event.file);
            let fileListLen = this[`fileList`].length;
            lists.map((item) => {
                this[`fileList`].push({
                    ...item,
                    status: "uploading",
                    message: "上传中",
                });
            });
            for (let i = 0; i < lists.length; i++) {
                const result = await this.uploadFilePromise(lists[i]);
                let item = this[`fileList`][fileListLen];
                this[`fileList`].splice(fileListLen, 1, Object.assign(item, { status: "success", message: "", url: result, }));
                this.formData.file_list.push({ url: result })
                fileListLen++;
            }
            console.log(this[`fileList`]);
        },
        /**
         * @todo 上传图片
         * @summary uni.uploadFile 上传文件的方法
         * @summary uniCloud.uploadFile 上传图片的方法
         */
        async uploadFilePromise(item) {
            console.log(item, 'item');
            const result = await uniCloud.uploadFile({
                filePath: item.url,
                cloudPath: item.name,
                onUploadProgress: function (res) {
                    // var percentCompleted = Math.round(
                    //     (res.loaded * 100) / res.total
                    // );
                }
            });
            console.log(result);
            return result.fileID
        }
    },
    /*
        函数名	说明	平台差异说明	最低版本
        onInit	监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad	百度小程序	3.1.0+
        onLoad	监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考示例
        onShow	监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
        onReady	监听页面初次渲染完成，此时组件已挂载完成，DOM 树($el)已可用，注意如果渲染速度快，会在页面进入动画完成前触发
        onHide	监听页面隐藏
        onUnload	监听页面卸载
        onResize	监听窗口尺寸变化	App、微信小程序、快手小程序
        onPullDownRefresh	监听用户下拉动作，一般用于下拉刷新，参考示例
        onReachBottom	页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项
        onTabItemTap	点击 tab 时触发，参数为Object，具体见下方注意事项	微信小程序、QQ小程序、支付宝小程序、百度小程序、H5、App、快手小程序、京东小程序
        onShareAppMessage	用户点击右上角分享	微信小程序、QQ小程序、支付宝小程序、抖音小程序、飞书小程序、快手小程序、京东小程序
        onPageScroll	监听页面滚动，参数为Object	nvue暂不支持
        onNavigationBarButtonTap	监听原生标题栏按钮点击事件，参数为Object	App、H5
        onBackPress	监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；详细说明及使用：onBackPress 详解
        支付宝小程序只有真机能触发，只能监听非navigateBack引起的返回，不可阻止默认行为。	app、H5、支付宝小程序
        onNavigationBarSearchInputChanged	监听原生标题栏搜索输入框输入内容变化事件	App、H5	1.6.0
        onNavigationBarSearchInputConfirmed	监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。	App、H5	1.6.0
        onNavigationBarSearchInputClicked	监听原生标题栏搜索输入框点击事件（pages.json 中的 searchInput 配置
        disabled 为 true 时才会触发）	App、H5	1.6.0
        onShareTimeline	监听用户点击右上角转发到朋友圈	微信小程序	2.8.1+
        onAddToFavorites	监听用户点击右上角收藏	微信小程序、QQ小程序	2.8.1+

    */
};
</script>

<style lang="scss">
.release {
    width: 100%;
    height: auto;
    background: #f2f3f5;
    padding: 20rpx 20rpx 0 20rpx;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, SimSun;
    font-size: 14px;

    .content {
        background: #fff;
    }
}
</style>
