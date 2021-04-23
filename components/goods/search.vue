<template>
	<!-- 自定义搜索框导航栏 -->
	<view class="maintop">
		<view class="maintop-search">
			<image class="maintop-search-img" src="../../static/search.png" mode=""></image>
			<input class="maintop-search-searchbox" type="text" v-model="searchValue" placeholder="请输入搜索内容..." />
			<button class="maintop-search-btn" type="default" @click="search"><text>搜索</text></button>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				searchValue:'',
				valueTag:0
			}
		},
		methods:{
			search(){
				if(this.valueTag == 1){
					uni.navigateTo({
						url:"../../pages/selectgoods/selectgoods?keywords=" + this.searchValue
					})
				}else{
					uni.showToast({
						title:"请输入1到9个字符哦",
						icon:"none"
					})
				}
			}
		},
		watch:{
			searchValue:function(val){
				if(val.length>9){
					this.valueTag = 0
					uni.showToast({
						title:"超出长度",
						icon:"none"
					})
				}else{
					this.valueTag = 1
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.maintop{
		z-index: 999;
		top: 0;
		width: 100%;
		height: 45px;
		//background-color: #FFFFFF;
		position: fixed;
		&-search{
			// top: 0;
			// left: 0;
			// right: 0;
			// bottom: 0;
			margin: 0 auto;
			margin-top: 50px;
			width: 90%;
			height: 40px;
			// background-color: #f3f3f3;
			background-color: #FFFFFF;
			border: 1px solid #F0AD4E;
			border-radius: 80rpx;
			display: flex;
			&-img{
				transform: translateY(12rpx);
				margin-left: 4rpx;
				width: 50rpx;
				height: 25px;
			}
			&-searchbox{
				transform: translateY(8rpx);
				background-color: #FFFFFF;
				border-radius: 20rpx;
				padding-top: 5px;
				padding-bottom: 5px;
				height: 30px;
				width: 80%;
				margin: 0 auto;
				margin-left: 10rpx;
				font-size: 15px;
			}
			&-btn{
				border-radius: 60rpx;
				width: 180rpx;
				height: 40px;
				line-height: 40px;
				right: -2px;
				top: -1px;
				background-color: #F0AD4E;
				text{
					color: #FFFFFF;
					font-size: 15px;
				}
			}
		}
	}
	
</style>
