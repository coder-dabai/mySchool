<template>
	<view>
		<view class="mainBtm-right">
				<view class="mainBtm-right-goods" v-for="(goods,index) in goodsList" :key = index @click="goodsDetails(goods._id)">
					<view class="mainBtm-right-goods-img">
						<image :src="goods.goodsImgs[0]" mode=""></image>
					</view>
					<view class="mainBtm-right-goods-name">
						<text>{{goods.goodsName}}</text>
					</view>
					<view class="mainBtm-right-goods-price">
						<text>{{goods.goodsPrice}}￥</text>
					</view>
					<view class="mainBtm-right-goods-date">
						<text>{{goods.goodsTime}}</text>
					</view>
					<view class="mainBtm-right-goods-user">
						<image :src="goods.userImg" mode=""></image>
						<text>{{goods.nickName}}</text>
					</view>
					<view class="mainBtm-right-goods-remove" @click.stop="remove(goods._id,index)">
						<text>删除</text>
					</view>
				</view>
				<view class="mainBtm-right-zhanwei">
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
				goodsList:[],
				pageSize:10,
				totalGoods:0,
				more:"loading",
				isLoadMore:false
			}
		},
		onReachBottom(){  //上拉触底函数
		          if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
		                this.isLoadMore=true
		                this.totalGoods+=10
		                this.getMoreGoods()
		          }
		    },
		methods:{
			goodsDetails(goodsId){
				uni.navigateTo({
					url:"../../goodsdetail/goodsdetail?id="+goodsId
				})
			},
			getMoreGoods(){
				uni.request({
					url:'http://49.232.24.177:3000/goods/mypublishgoods',
					data:{
						userId:this.userId,
						totalGoods:this.totalGoods,
						pageSize:this.pageSize
					},success: (res) => {
						let that = this
							that.goodsList =that.goodsList.concat(res.data.result)
							if(res.data.result.length<that.pageSize){   //当请求数据小于pageSize
								that.isLoadMore=true                                             
								that.more='nomore'
							}else{
							        that.isLoadMore=false
							        }
						
					},fail: () => {
						uni.showToast({title: '服务器开小差了呢，请您稍后再试',icon:'none'})
						                            this.isLoadMore=false
						                            if(this.totalGoods>5){
						                                  this.totalGoods-=5
						                            }
					}
				})
			},
			remove(goodsId,index){
				let that = this
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗？',
				    success: function (res) {
				        if (res.confirm) {
							that.goodsList.splice(index,1)
							uni.request({
								url:"http://49.232.24.177:3000/goods/remove",
								data:{
									goodsId
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
		created() {
				this.userId = this.$store.state.userInfo._id
				let that = this
				uni.request({
					url:"http://49.232.24.177:3000/goods/mypublishgoods",
					data:{
						userId:that.userId,
						pageSize:10,
						totalMsgs:0
						},
					success: (res) => {
						that.goodsList = res.data.result
					}
				})
		},
		watch:{
			goodsList(val){
				if(val.length<10){
					this.more = 'nomore'
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mainBtm-right{
		padding-top: 10px;
		width: 750rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		// &-tips{
		// 	width: 580rpx;
		// 	height: 100rpx;
		// 	line-height: 100rpx;
		// 	text-align: center;
		// 	text{
		// 		font-size: 20rpx;
		// 	}
		// }
		&-zhanwei{
			width: 300rpx;
			height: 500rpx;
		}
		&-goods{
			position: relative;
			width: 300rpx;
			height: 500rpx;
			margin-bottom: 20rpx;
			border-radius: 20rpx;
			//height: 400rpx;
			background-color: #F5F5F5 ;
			&-remove{
				position: absolute;
				right: 0;
				text{
					color: #007AFF;
					font-size: 30rpx;
				}
			}
			&-img{
				image{
					width: 300rpx;
					height: 240rpx;
					border-radius: 20rpx;
				}
			}
			&-name{
				overflow: hidden;
				text{
					font-size: 25rpx;
				}
			}
			&-price{
				text{
					color: #FF0000;
				}
			}
			&-date{
				text{
					font-size: 25rpx;
					opacity: 0.5;
				}
			}
			&-user{
				overflow: hidden;
				height: 40rpx;
				line-height: 40rpx;
				display: flex;
				image{
					width: 40rpx;
					height: 40rpx;
					border-radius: 20rpx;
				}
				text{
					margin-left: 20rpx;
					font-size: 30rpx;
				}
			}
		}
	}
</style>
