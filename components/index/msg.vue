<template>
	<view class="main">
		<view class="main-content" @click="msgClick(item._id)" v-for="item in msgs" :key = item._id>
			<view class="main-content-top">
				<image :src=item.userImg mode="" class="main-content-top-tou"></image>
				<view class="main-content-top-nameandtime">
					<text class="main-content-top-nameandtime-name">{{item.nickName}}</text>
					<text class="main-content-top-nameandtime-time">{{item.msgDate}}</text>
				</view>
			</view>
			<view class="main-content-bottom">
				<text>{{item.msgContent}}</text>
				<view class="main-content-bottom-imgs" >
					<view class="main-content-bottom-imgs-img" v-for="(img,index) in item.msgImgs" :key=index>
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
			}
		},
		props:{
			msgs:{
				type:Array
			}
		}
		,
		methods:{
			msgClick(id){
				uni.navigateTo({
					url:'../../pages/msgdetail/msgdetail?id='+id
				})
			}
		},
		created() {
			//console.log("shuchu")
			//console.log(this.msgs)
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
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
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
