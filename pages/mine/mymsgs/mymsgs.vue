<template>
	<view class="main">
		<view class="main-content" @click="msgClick(item._id)" v-for="(item,index) in mymsgs" :key = index>
			<view class="main-content-top">
				<image :src=item.userImg mode="" class="main-content-top-tou"></image>
				<view class="main-content-top-nameandtime">
					<text class="main-content-top-nameandtime-name">{{item.nickName}}</text>
					<text class="main-content-top-nameandtime-time">{{item.msgDate}}</text>
				</view>
				<view class="main-content-top-remove" @click.stop="remove(item._id,index)">
					<text>删除</text>
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
		<view v-show="isLoadMore"> 
		<uni-load-more :status="more"></uni-load-more>  <!-- 引入uniLoadMore插件-->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userId:'',
				mymsgs:[],
				pageSize:10,
				totalMsgs:0,
				more:"loading",
				isLoadMore:false
			}
		},
		onReachBottom(){  //上拉触底函数
		          if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
		                this.isLoadMore=true
		                this.totalMsgs+=10
		                this.getMoreMsgs()
		          }
		    },
		methods:{
			msgClick(id){
				uni.navigateTo({
					url:"../../msgdetail/msgdetail?id="+id
				})
			},
			getMoreMsgs(){
				uni.request({
					url:'http://49.232.24.177:3000/msgs/mypublishmsgs',
					data:{
						userId:this.userId,
						totalMsgs:this.totalMsgs,
						pageSize:this.pageSize
					},success: (res) => {
						let that = this
							that.mymsgs =that.mymsgs.concat(res.data.result)
							if(res.data.result.length<that.pageSize){   //当请求数据小于pageSize
								that.isLoadMore=true                                             
								that.more='nomore'
							}else{
							        that.isLoadMore=false
							        }
						
					},fail: () => {
						uni.showToast({title: '服务器开小差了呢，请您稍后再试',icon:'none'})
						                            this.isLoadMore=false
						                            if(this.totalMsgs>5){
						                                  this.totalMsgs-=5
						                            }
					}
				})
			},
			remove(msgId,index){
				let that = this
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗？',
				    success: function (res) {
				        if (res.confirm) {
							that.mymsgs.splice(index,1)
							uni.request({
								url:"http://49.232.24.177:3000/msgs/remove",
								data:{
									msgId
								},
								success: (res) => {
									if(res.data.code == 1){
										uni.showToast({
											title:"删除成功"
										})
									}
								}
							})
							
				        }
				    }
				});
			}
		},
		watch:{
			mymsgs(val){
				if(val.length<10){
					this.more = 'nomore'
				}
			}
		},
		created() {
			//console.log("shuchu")
			//console.log(this.msgs)
			this.userId = this.$store.state.userInfo._id
			let that = this
			uni.request({
				url:"http://49.232.24.177:3000/msgs/mypublishmsgs",
				data:{
					userId:that.userId,
					pageSize:10,
					totalMsgs:0
					},
				success: (res) => {
					that.mymsgs = res.data.result
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
			position: relative;
			&-remove{
				width: 100rpx;
				height: 100rpx;
				position: absolute;
				right: 10rpx;
				text{
					font-size: 30rpx;
					color: #007AFF;
				}
			}
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
