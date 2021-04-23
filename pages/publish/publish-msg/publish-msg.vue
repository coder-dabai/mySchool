<template>
	<view class="main">
		<textarea class="main-text" v-model="formdata.msgContent" placeholder="说点什么吧..." maxlength="300" focus="true" />
		<view class="main-chooseImg" @click="chooseImg">
			<image src="../../../static/photo.png" mode=""></image>
		</view>
		<view class="main-imgbox">
			<view class="main-imgbox-showImg" v-for="(item,index) in formdata.msgImgs" :key = index>
				<image class="main-imgbox-showImg-remove" @click="removeImg(index)" src="../../../static/remove.png" mode=""></image>
				<image class="main-imgbox-showImg-img" :src="item" mode=""></image>
			</view>
		</view>
		<button class="main-submit" type="primary" @click="publish">发布</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				formdata:{
					userId:'',
					userImg:'',
					nickName:'',
					msgContent:'',
					msgImgs:[],
					msgDate:''
				}
			}
		},
		methods:{
			removeImg(index){
				this.formdata.msgImgs.splice(index,1)
			},
			publish(){
				if(this.formdata.msgContent.length == 0 && this.formdata.msgImgs.length == 0){
					uni.showToast({
						title:"发布内容不能为空",
						icon:"none"
					})
				}
				if(this.formdata.msgImgs.length >9){
					uni.showToast({
						title:"一次最多发送9张图片",
						icon:"none"
					})
				}else{
					uni.request({
						url:"http://49.232.24.177:3000/msgs/publish",
						method:"POST",
						data:this.formdata,
						success: (res) => {
							if(res.data.code == 1){
								uni.showToast({
									title:"发布成功",
									success() {
										setTimeout(function(){
											uni.switchTab({
												url:"../publish"
											})
										},1000)
									}
								})
							}
							
						}
					})
				}
			},
			chooseImg(){
					var that = this
					uni.chooseImage({
					    count: 9,
					    success(res) {
					        console.log(res);
					        if (res.tempFilePaths.length > 0) {
								let filePath = res.tempFilePaths
								//进行上传操作
								for(let i=0;i<res.tempFilePaths.length;i++){
									uniCloud.uploadFile({
									        filePath: filePath[i],
									cloudPath: 'a.jpg',
									onUploadProgress: function(progressEvent) {
									  console.log(progressEvent);
									  var percentCompleted = Math.round(
									    (progressEvent.loaded * 100) / progressEvent.total
									  );
									        },
									        success(res) {
												let lianjie = res.fileID
												that.formdata.msgImgs.push(lianjie)
												console.log(lianjie)
											},
									        fail() {},
									        complete() {}
									    });
														
								}
					        }
					    }
					});
			}
		},
		onLoad() {
				this.formdata.userId = this.$store.state.userInfo._id
				this.formdata.userImg = this.$store.state.userInfo.userImg
				this.formdata.nickName = this.$store.state.userInfo.nickName
				var date = new Date()
				var year = date.getFullYear()
				var month = date.getMonth()+1
				var day = date.getDate()
				var hours = date.getHours()
				var minutes = date.getMinutes()
				var msgDate = year+"/"+month+"/"+day + " " + hours+":"+minutes
				this.formdata.msgDate = msgDate
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		height: 500rpx;
		&-text{
			width: 100%;
		}
		&-submit{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 90rpx;
		}
		&-chooseImg{
			margin-top: 30rpx;
			margin-left: 20rpx;
			image{
				width: 160rpx;
				height: 160rpx;
			}
		}
		&-imgbox{
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 100rpx;
			&-showImg{
				position: relative;
				margin-left: 10rpx;
				width: 200rpx;
				height: 200rpx;
				&-remove{
					position: absolute;
					width: 50rpx;
					height: 50rpx;
					right: 0;
					z-index: 999;
				}
				&-img{
					width: 200rpx;
					height: 200rpx;
				}
			}
		}
		
	}
</style>
