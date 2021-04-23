<template>
	<view class="main">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
		    <swiper-item v-for="(item,index) in swipeImgs" :key=index>
		        <view class="swiper-item uni-bg-red"><image class="imgSize" :src=item.swiperImg mode=""></image></view>
		    </swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data() {
		        return {
		            background: ['color1', 'color2', 'color3'],
		            indicatorDots: true,
		            autoplay: true,
		            interval: 3000,
		            duration: 500,
					circular: true,
					swipeImgs:[]
		        }
		    },
			created() {
				uni.request({
					url:'http://49.232.24.177:3000/swiper/getswipers',
					success: (res) => {
						this.swipeImgs = res.data.result
					}
				})
			},
		    methods: {
		        
		    }
	}
	
</script>

<style lang="scss" scoped>
	.swiper{
		height: 440rpx;
		.imgSize{
			height: 440rpx;
			width: 100%;
		}
	}
</style>
