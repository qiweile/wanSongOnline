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
                    " >
                        <u--input v-model="formData.gender" disabled disabledColor="#ffffff" placeholder="请选择性别"
                            border="none"></u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item label="电话" prop="mobile" borderBottom >
                        <u--input v-model="formData.mobile" maxlength="11" border="none" placeholder="请输入电话"></u--input>
                    </u-form-item>
                    <u-form-item label="生日" prop="birthday" borderBottom @click="
                        showBirthday = true;
                    hideKeyboard();
                    " >
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
                    " >
                        <u--input v-model="formData.education" disabled disabledColor="#ffffff" placeholder="请选择学历"
                            border="none"></u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item label="单位" prop="unit" borderBottom >
                        <u--input v-model="formData.unit" border="none" placeholder="请输入单位"></u--input>
                    </u-form-item>
                    <u-form-item label="收入" prop="income" borderBottom @click="
                        showIncome = true;
                    hideKeyboard();
                    ">
                        <u--input v-model="formData.income" disabled disabledColor="#ffffff" placeholder="请选择收入范围"
                            border="none"></u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item label="婚否" prop="marriage" borderBottom >
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
                                    <u-upload :fileList="formData.file_fist" @afterRead="afterRead" @delete="deletePic" name="3"
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
                    @close="showBirthday=false" />
            </view>
            <u-toast ref="uToast" />
        </view>
    </view>
</template>

<script>
import { toPage } from '@/common/utils.js'
export default {
    data() {
        return {
            userInfo: {},
            formData: {
                nickname: "", // 昵称
                unit: "", // 单位
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
    onReady() {
        // 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
        this.$refs.form.setRules(this.rules);
        this.userInfo = uni.getStorageSync('uni_userInfo')
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
        submit() {
            // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
            this.$refs.form.validate().then((res) => {
                uniCloud.callFunction({
                    name: 'publish-message',
                    data: {
                        uid: this.userInfo._id,
                        params: {...this.formData}
                    },
                }).then(res => {
                    let { result: { code, msg }} = res
                    if(code === 200) {
                        this.$refs.uToast.show({
                            type: 'success',
                            message: msg
                        })
                        setTimeout(() => {
                            toPage('/pages/main/main')
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
        hideKeyboard() {
            uni.hideKeyboard();
        },
        // 删除图片
        deletePic(event) {
            this[`fileList`].splice(event.index, 1);
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
                this.formData.file_list.push(result)
                fileListLen++;
            }
        },
        /***
         * @todo 上传图片
         * @summary uni.uploadFile 上传文件的方法
         * @summary uniCloud.uploadFile 上传图片的方法
         */
        async uploadFilePromise(item) {
            const result = await uniCloud.uploadFile({
                filePath: item.url,
                cloudPath: item.name,
                onUploadProgress: function (res) {
                    // var percentCompleted = Math.round(
                    //     (res.loaded * 100) / res.total
                    // );
                }
            });
            return result.fileID
        }
    },
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
