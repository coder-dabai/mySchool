<template>
	<view class="content">
		<swipe></swipe>
		<msg :msgs="msgs"></msg>
		<view v-show="isLoadMore">  
		<uni-load-more :status="more"></uni-load-more>  <!-- 引入uniLoadMore插件-->
		</view>
	</view>
</template>

<script>
	import swipe from '../../components/index/swipe.vue'
	import msg from '../../components/index/msg.vue'
	export default {
		data() {
			return {
				msgs:[],
				totalMsgs:0,
				pageSize:5,
				more:"loading",
				isLoadMore:false
			}
		},
		components:{
			swipe,
			msg
		},
		onLoad() {

		},
		onReachBottom(){  //上拉触底函数
		          if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
		                this.isLoadMore=true
		                this.totalMsgs+=5
		                this.getMoreMsgs()
		          }
		    },
		onPullDownRefresh(){
			uni.request({
				url:'http://49.232.24.177:3000/msgs/getmsgs',
				data:{
					totalMsgs:0,
					pageSize:5
				},
				success: (res) => {
					this.totalMsgs = 0
					this.msgs = res.data.result
					this.isLoadMore = false
					this.more = "loading"
					uni.stopPullDownRefresh()
				}
			})
		},
		created(){
			uni.request({
				url:'http://49.232.24.177:3000/msgs/getmsgs',
				data:{
					totalMsgs:0,
					pageSize:5
				},
				success: (res) => {
					this.msgs = res.data.result
				}
			})
		},
		methods: {
			getMoreMsgs(){
				uni.request({
					url:'http://49.232.24.177:3000/msgs/getmsgs',
					data:{
						totalMsgs:this.totalMsgs,
						pageSize:this.pageSize
					},success: (res) => {
						let that = this
						setTimeout(function(){
							that.msgs =that.msgs.concat(res.data.result)
							if(res.data.result.length<that.pageSize){   //当请求数据小于pageSize
								that.isLoadMore=true                                             
								that.more='nomore'
							}else{
							        that.isLoadMore=false
							        }
						},1000)
						
					},fail: () => {
						uni.showToast({title: '服务器开小差了呢，请您稍后再试',icon:'none'})
						                            this.isLoadMore=false
						                            if(this.totalMsgs>5){
						                                  this.totalMsgs-=5
						                            }
					}
				})
			}
		}
	}
</script>

<style>
	
</style>
