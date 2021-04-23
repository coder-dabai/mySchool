<template>
	<view class="mainBtm">
		<!-- 左侧分类 -->
		
		<view class="mainBtm-left">
			<scroll-view scroll-y="true" :style="screenHeight">
				<view class="mainBtm-left-item" v-for="(item,index) in typeList" :key = index :class="{itemClick:clickTag==index}" @click="itemClick(item,index)">
					<text>{{item}}</text>
				</view>
				</scroll-view>
		</view>
		
		<scroll-view scroll-y="true" :style="screenHeight" @scrolltolower="loadmore">
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
				</view>
				<view class="mainBtm-right-zhanwei">
				</view>
				<view class="mainBtm-right-tips" v-if="!loadTag">
					<text>没有更多数据了~</text>
				</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				typeList:["数码","书籍","文具","四六级","考研","教资","日用百货","女装","鞋子","电器","手机","电脑","美妆洗护","代步工具","床上用品","男装","箱包","其他"],
				screenHeight:{
					height:""
				},
				clickTag:0,
				goodsList:[],
				totalGoods:0,
				pageSize:10,
				loadTag:true,
				goodsClass:'',
			}
		},
		methods:{
			itemClick(item,index){
				this.loadTag = true
				this.totalGoods = 0
				this.clickTag = index
				this.goodsClass = item
				let that = this
				uni.request({
					url:"http://49.232.24.177:3000/goods/getgoods",
					data:{
						goodsClass : that.goodsClass,
						totalGoods:0,
						pageSize:10
						},
					success: (res) => {
						that.goodsList = res.data.result
					}
				})
			},
			loadmore(){
				if(this.loadTag){
					this.totalGoods += 10
					let that = this
					uni.request({
						url:"http://49.232.24.177:3000/goods/getgoods",
						data:{
							goodsClass : that.goodsClass,
							totalGoods:that.totalGoods,
							pageSize:that.pageSize
						},
						success: (res) => {
							that.goodsList = that.goodsList.concat(res.data.result)
							if(res.data.result.length < that.pageSize){
								that.loadTag = false
							}
						}
					})
				}
				
			},
			goodsDetails(goodsId){
				uni.navigateTo({
					url:"../../pages/goodsdetail/goodsdetail?id=" + goodsId
				})
			}
		},
		created() {
			let that = this
			that.goodsClass = "数码"
			uni.request({
				url:"http://49.232.24.177:3000/goods/getgoods",
				data:{
					goodsClass : that.goodsClass,
					totalGoods:0,
					pageSize:10
					},
				success: (res) => {
					that.goodsList = res.data.result
				}
			})
			uni.getSystemInfo({
				success(res) {
					that.screenHeight.height = res.screenHeight -140 +"px"
				}
			})
		},
		
	}
</script>

<style lang="scss" scoped>
	.mainBtm{
		margin-top: 50px;
		display: flex;
		//background-color: #F5F5F5;
		//padding-top: 10px;
		&-left{
			width: 200rpx;
			padding-bottom: 50px;
			background-color: #F5F5F5;
			&-item{
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
			}
		}
		&-right{
			width: 580rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			&-tips{
				width: 580rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				text{
					font-size: 20px;
				}
			}
			&-zhanwei{
				width: 240rpx;
			}
			&-goods{
				width: 240rpx;
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				//height: 400rpx;
				background-color: #F5F5F5 ;
				&-img{
					image{
						width: 240rpx;
						height: 200rpx;
						border-radius: 20rpx;
					}
				}
				&-name{
					overflow: hidden;
					text{
						font-size: 30rpx;
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
	}
.itemClick{
	background-color: #FFFFFF;
}
</style>
