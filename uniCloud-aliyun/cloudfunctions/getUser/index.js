'use strict';

const { log } = require("console");

const db = uniCloud.database()
exports.main = async (event, context) => {
	/**
	 * doc:方法的参数只能是字符串，即数据库默认的_id字段
	 * update:局部更新记录(触发请求)只更新传入的字段。如果被更新的记录不存在，会直接返回更新失败
	 */
	let res = {}
	switch (event.action) {
		case 'getRelUsers':
			res = await db.collection('uni-id-users').where({
				isRel: true
			}).get()
			break;
		case 'editUser':
			res = await db.collection('uni-id-users').where({
				_id: event.uid
			}).get()
			break;
		default:
			res = {
				code: 403,
				msg: '非法访问'
			}
			break;
	}
	return {
		code: 200,
		data: res.data,
		msg: '查询成功'
	}
};
