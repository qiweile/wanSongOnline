'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	try {
		const fileID = event.fileID;
		const result = await uniCloud.deleteFile({
			fileList: [fileID]
		})
		res = await db.collection('uni-id-users').doc(event.uid).update({
			
		})
		//返回数据给客户端
		return {
			success: true,
			message: '图片删除成功',
			data: result
		}
	} catch (err) {
		return {
			success: false,
			message: '图片删除失败',
			error: err
		}
	}
	
};
