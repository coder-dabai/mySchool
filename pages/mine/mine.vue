<template>
	<view class="main">
		<navigator url="editInfo/editInfo">
			<view class="main-userinfo" >
				<view class="main-userinfo-left">
					<image :src="userInfo.userImg" mode=""></image>
				</view>
				<view class="main-userinfo-right">
					<text class="main-userinfo-right-nickname">{{userInfo.nickName}}</text>
					<image :src=genderImg mode=""></image>
				</view>
			</view>
		</navigator>

		<uni-list class="main-mypublish">
			<uni-list-item title="我的说说" link to="./mymsgs/mymsgs" note=""></uni-list-item>
			<uni-list-item title="我的闲置" link to="./mygoods/mygoods" note=""></uni-list-item>
		</uni-list>
		<button type="warn" @click="out" class="out">退出</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userInfo:{},
				genderImg:''
			}
		},
		methods:{
			out(){
				var that = this
				uni.showModal({
				    title: '提示',
				    content: '确定要退出吗？',
				    success: function (res) {
				        if (res.confirm) {
							uni.removeStorage({
							    key: 'userInfo',
							    success: function (res) {
							        console.log('success');
							    }
							});
							that.$store.commit('setuser','')
							uni.redirectTo({
								url:'../login/login'
							})
				        }
				    }
				});
			}
		},
		onLoad() {
			this.userInfo = this.$store.state.userInfo
			if(this.userInfo.gender == 1){
				this.genderImg = '../../static/man.png'
			}else{
				this.genderImg = '../../static/woman.png'
			}
		},
		onShow() {
			if(this.userInfo.gender == 1){
				this.genderImg = '../../static/man.png'
			}else{
				this.genderImg = '../../static/woman.png'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		.out{
			margin-top: 100rpx;
			border-radius: 60rpx;
		}
		a{
			text-decoration: none;
			color: #333333;
		}
		&-userinfo{
			display: flex;
			width: 100%;
			height: 200rpx;
			box-sizing: border-box;
			background-color: #FFE4CA;
			border-radius: 20rpx;
			padding-top: 50rpx;
			&-left{
				width: 100rpx;
				height: 100rpx;
				border-radius: 60rpx;
				margin-left: 20rpx;
				image{
					width: 100rpx;
					height: 100rpx;
					border-radius: 60rpx;
				}
			}
			&-right{
				margin-left: 20rpx;
				line-height: 100rpx;
				image{
					margin-left: 10rpx;
					width: 30rpx;
					height: 30rpx;
					transform: translateY(5rpx);
				}
			}
		}
		&-mypublish{
			margin-top: 20rpx;
		}
	}
</style>
