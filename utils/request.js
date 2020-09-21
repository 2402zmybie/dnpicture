//es6  promise uni-appapi的铺垫

export default (params)=> {
	//加载中
	uni.showLoading({
		title:"加载中"
	})
	
	return new Promise((resolve,reject)=> {
		uni.request({
			...params,
			success: (res) => {
				resolve(res);
			},
			fail(err) {
				reject(err)
			},
			complete() {
				//成功或者失败都会走 complete回调
				uni.hideLoading();
			}
			
		})
	})
}