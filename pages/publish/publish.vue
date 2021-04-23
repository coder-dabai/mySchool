<template>
	<view class="main">
		<navigator url="publish-msg/publish-msg">
			<button type="default" class="main-publishMsg"><text>发布说说</text></button>
		</navigator>
		<navigator url="publish-goods/publish-goods">
			<button type="default" class="main-publishGoods"><text>发布闲置</text></button>
		</navigator>
		
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.main{
		text{
			color: #F8F8F8;
		}
		&-publishMsg{
			margin-top: 300rpx;
			width: 100%;
			height: 200rpx;
			line-height: 200rpx;
			background-color: #ACD6FF;
			border-radius: 40rpx;
		}
		&-publishGoods{
			margin-top: 20rpx;
			width: 100%;
			height: 200rpx;
			line-height: 200rpx;
			background-color: #019858;
			border-radius: 40rpx;
		}
	}
</style>
