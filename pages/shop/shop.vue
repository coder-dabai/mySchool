<template>
		<view class="main" :style="screenHeight">
			<search></search>
			<goods></goods>
		</view>
</template>

<script>
	import search from "../../components/goods/search.vue"
	import goods from "../../components/goods/goods.vue"
	export default{
		components:{
			search,
			goods
		},
		data(){
			return{
				screenHeight:{
					height:""
				},
			}
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
				success(res) {
					//that.screenHeight.height = res.screenHeight -90 +"px"
					that.screenHeight.height = res.screenHeight -90 +"px"
				}
			})
		},
		methods:{
			
		}
}
</script>

<style lang="scss" scoped>

.main{
	overflow: hidden;
}
</style>
