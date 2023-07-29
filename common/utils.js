import store from '../store';
export function getDeviceUUID() {
	let deviceId = uni.getStorageSync('uni_deviceId') ||
    uni.getSystemInfoSync().deviceId ||
    uni.getSystemInfoSync().system + '_' + Math.random().toString(36).substr(2);
	uni.setStorageSync('uni_deviceId', deviceId)
	return deviceId;
}
/***
 * @todo 跳转页面的方法
 * @param 1:保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面
 * @param 2:关闭当前页面，跳转到应用内的某个页面。
 * @param 3:跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
 */
export function toPage(type = 1,url) {
    switch (type) {
        case 1:
            uni.navigateTo({
                url
            });
            break;
        case 2:
            uni.redirectTo({
                url
            });
            break;
        case 3:
            uni.switchTab({
                url
            });
            break;
        default:
            break;
    }
}
/**
 * @todo 根据年份返回属相
 * @param 年份
 */
export function getChineseZodiac(year) {
    const zodiacs = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']
    return zodiacs[( year - 4 ) % 12]
}
/**
 * @todo 阻塞性函数
 */
export function blockFun(back) {
    return new Promise(resolve => back(resolve))
}
/**
 * @todo 登录提示
 */
export function guideToLogin(back) {
    let { hasLogin } = store.state
    if (hasLogin) return back ? back(false) : false
    return uni.showModal({
        title: "未登录",
        content: "您未登录，需要登录后才能继续",
        success: (res) => {
            if (res.confirm) {
                back && back(true)
                uni.reLaunch({ url: "../login/login" });
                return true
            } else {
                back && back(false)
                return false
            }
        }
    })
}
/**
 * @todo 计算 token 的剩余有效期（秒）
 * @param token
 */
export function countTime(token) {
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expirationTime = payload.exp * 1000;
    let currentTime = Date.now();
    let remainingTime = Math.floor((expirationTime - currentTime) / 1000)
    return remainingTime
}
