'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {uid,params} = event
	/**
	 * doc:方法的参数只能是字符串，即数据库默认的_id字段
	 * update:局部更新记录(触发请求)只更新传入的字段。如果被更新的记录不存在，会直接返回更新失败
	 */
	let data = await db.collection('uni-id-users').get()
	return {
		code: 200,
		data,
		msg: '数据更新成功'
	}
};
