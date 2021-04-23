<template>
	<view class="main">
		<view class="main-content">
			<view class="main-content-top">
				<image :src=msgs.userImg mode="" class="main-content-top-tou"></image>
				<view class="main-content-top-nameandtime">
					<text class="main-content-top-nameandtime-name">{{msgs.nickName}}</text>
					<text class="main-content-top-nameandtime-time">{{msgs.msgDate}}</text>
				</view>
			</view>
			<view class="main-content-bottom">
				<text>{{msgs.msgContent}}</text>
				<view class="main-content-bottom-imgs" >
					<view class="main-content-bottom-imgs-img" v-for="(img,index) in msgs.msgImgs" :key=index>
						<image :src=img mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				msgs:{}
			}
		},
		onLoad:function(option){
			uni.request({
				url:'http://49.232.24.177:3000/msgs/details',
				data:{
					msgId : option.id
				},success: (res) => {
					this.msgs = res.data.result
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
.main{
	background-color: #ECF0F1;
	padding-top: 2rpx;
	&-content{
		background-color: #FDFEFE;
		margin-top: 20rpx;
		width: 100%;
		//height: 400rpx;
		&-top{
			height: 150rpx;
			display: flex;
			&-tou{
				margin-left: 10rpx;
				margin-top: 16rpx;
				width: 100rpx;
				height: 100rpx;
				border-radius: 60rpx;
			}
			&-nameandtime{
				margin-left: 20rpx;
				margin-top: 20rpx;
				&-name{
					font-size: 32rpx;
					display: block;
				}
				&-time{
					font-size: 10px;
					opacity: 0.5;
				}
			}
		}
		&-bottom{
			margin-left: 10rpx;
			margin-right: 10rpx;
			text{
				
				font-size: 32rpx;
			}
			&-imgs{
					margin-top: 20rpx;
					display: flex;
					flex-wrap: wrap;
					&-img{
						margin-right: 4rpx;
						margin-top: 4rpx;
						image{
							width: 200rpx;
							height: 200rpx;
						}
					}
			}
		}
	}
}
	
</style>
