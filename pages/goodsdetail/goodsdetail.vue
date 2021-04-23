<template>
	<view class="main">
		<view class="main-top">
			<view class="main-top-head">
				<image :src="details.userImg" mode=""></image>
			</view>
			<view class="main-top-info">
				<text>{{details.nickName}}</text>
				<text>{{details.goodsTime}}</text>
			</view>
		</view>
		
		<view class="main-bottom">
			<view class="main-bottom-price">
				<text>￥{{details.goodsPrice}}</text>
			</view>
			<view class="main-bottom-goodsDesc">
				<text>{{details.goodsDesc}}</text>
			</view>
			<view class="main-bottom-imgs" v-for="(imgs,index) in details.goodsImgs" :key = index>
				<image :src="imgs" mode=""></image>
			</view>
		</view>
		<view class="main-buy">
			<view class="main-buy-title">
				<text>联系方式:</text>
			</view>
			<view class="main-buy-QQ">
				<text>QQ:{{details.qq}}</text>
			</view>
			<view class="main-buy-phone">
				<text>电话:{{details.phone}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				details:{}
			}
		},
		onLoad(option) {
			uni.request({
				url:"http://49.232.24.177:3000/goods/details",
				data:{
					goodsId : option.id
				},
				success: (res) => {
					this.details = res.data.result
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		&-buy{
			font-size: 30rpx;
			border-top: 1px solid #EEEEEE;
		}
		&-top{
			width: 100%;
			//height: 100rpx;
			display: flex;
			//background-color: #F5F5F5 ;
			&-head{
				image{
					width: 100rpx;
					height: 100rpx;
					border-radius: 60rpx;
				}
			}
			&-info{
				margin-top: 10rpx;
				margin-left: 20rpx;
				text{
					display: block;
					font-size: 40rpx;
				}
				text:nth-child(2){
					font-size: 10px;
					opacity: 0.5;
				}
			}
		}
		&-bottom{
			&-price{
				text{
					font-size: 40rpx;
					color: #FF0000;
				}
			}
			&-goodsDesc{
				text{
					font-size: 30rpx;
				}
			}
			&-imgs{
				text-align: center;
				image{
					width: 750rpx;
					height: 750rpx;
					border-radius: 30rpx;
				}
			}
		}
	}
</style>
