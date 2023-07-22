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
 */
export function toPage(url,type) {
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
        default:
            uni.switchTab({
                url
            });
            break;
    }
}