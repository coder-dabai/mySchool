<template>
	<view class="main">
		<view class="main-tou" @click="chooseUsrImg">
			<text>头像</text>
			<image :src="userInfo.userImg" mode=""></image>
		</view>
		<hr/>
		<view class="main-nickname">
			<text>昵称</text>
			<uni-easyinput class="main-nickname-value" v-model="userInfo.nickName" placeholder="" />
		</view>
		<hr/>
		<view class="main-gender">
			<text>性别</text>
			<radio-group class="main-gender-radio">
				<label>
					<radio value="1" :checked="userInfo.gender == '1'" @click="radioClick(1)"/><text>男</text>
				</label>
				<label>
					<radio value="0" :checked="userInfo.gender == '0'" @click="radioClick(0)"/><text>女</text>
				</label>
			</radio-group>
		</view>
		<hr/>
		<button type="primary" @click="submit">确定</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				submitTag:1,
				userInfo:{},
			}
		},
		onLoad(option) {
			this.userInfo = this.$store.state.userInfo
		},
		methods:{
			radioClick(a){
				this.userInfo.gender = a
			},
			submit(){
				if(this.userInfo.nickName.length==0){
					this.submitTag = 0
				}
				if(this.submitTag == 0){
					uni.showToast({
						title:"昵称不能为空",
						icon:"none"
					})
					return
				}else{
					uni.request({
						method:"POST",
						url:"http://49.232.24.177:3000/users/edit",
						data:this.userInfo,
						success: (res) => {
							if(res.data.code == 1){
								uni.setStorage({
								    key: 'userInfo',
								    data: JSON.stringify(this.userInfo),
								    success: function () {
								        console.log('success');
								    }
								});
								uni.showToast({
									title:"保存成功"
								})
							}else{
								uni.showToast({
									title:"保存失败",
									icon:"none"
								})
							}
						}
					})
				}
			},
			chooseUsrImg(){
				var that = this
				uni.chooseImage({
				    count: 1,
				    success(res) {
				        console.log(res);
				        if (res.tempFilePaths.length > 0) {
				            let filePath = res.tempFilePaths[0]
				            //进行上传操作
				
				            // callback方式，与promise方式二选一即可
				            uniCloud.uploadFile({
				                filePath: filePath,
				        cloudPath: 'b.jpg',
				        onUploadProgress: function(progressEvent) {
				          console.log(progressEvent);
				          var percentCompleted = Math.round(
				            (progressEvent.loaded * 100) / progressEvent.total
				          );
				                },
				                success(res) {
									that.userInfo.userImg = res.fileID
								},
				                fail() {},
				                complete() {}
				            })
				
				        }
				    }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	hr{
		opacity: 0.2;
	}
	.main{
		text{
			margin-left: 10rpx;
		}
		&-tou{
			width: 100%;
			height: 120rpx;
			line-height: 120rpx;
			display: flex;
			image{
				width: 100rpx;
				height: 100rpx;
				margin-top: 10rpx;
				transform: translateX(540rpx);
				border-radius: 60rpx;
			}
		}
		&-nickname{
			margin-top: 10rpx;
			height: 100rpx;
			line-height: 100rpx;
			margin-bottom: 20rpx;
			display: flex;
			&-value{
				margin-left: 20rpx;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}
		&-gender{
			display: flex;
			height: 100rpx;
			box-sizing: border-box;
			padding-top: 20rpx;
			&-radio{
				margin-left: 20rpx;
			}
		}
	}
</style>
