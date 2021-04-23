<template>
    <view class="main">
        <uni-forms ref="form" :value="formData" :rules="rules">
            <uni-forms-item label="物品名" name="goodsName">
                <uni-easyinput type="text" v-model="formData.goodsName" placeholder="请输入物品名称" />
            </uni-forms-item>
            <uni-forms-item  label="分类" name="goodsClass">
                <picker class="goodsType" :range="array" @change="bindPickerChange" :value="index">
                	<view class="uni-input">{{array[index]}}</view>
                </picker>
            </uni-forms-item>
			<uni-forms-item label="物品描述" name="goodsDesc">
				<textarea class="desc" v-model="formData.goodsDesc" placeholder="描述一下吧~" />
			</uni-forms-item>
			<uni-forms-item label="物品价格" name="goodsPrice">
				<uni-easyinput type="number" v-model="formData.goodsPrice" placeholder="请输入物品价格" />
			</uni-forms-item>
			<uni-forms-item label="联系QQ" name="qq">
				<uni-easyinput type="number" v-model="formData.qq" placeholder="请输入联系qq" />
			</uni-forms-item>
			<uni-forms-item label="联系电话" name="phone">
				<uni-easyinput type="number" v-model="formData.phone" placeholder="电话选填" />
			</uni-forms-item>
			<view class="chooseImg" @click="chooseImg">
				<image src="../../../static/photo.png" mode=""></image>
			</view>
			<view class="imgbox">
				<view class="imgbox-showImg" v-for="(item,index) in formData.goodsImgs" :key = index>
					<image class="imgbox-showImg-remove" @click="removeImg(index)" src="../../../static/remove.png" mode=""></image>
					<image class="imgbox-showImg-img" :src="item" mode=""></image>
				</view>
			</view>
            <button @click="submit" type="primary" class="btn">提交</button>
        </uni-forms>
    </view>
</template>

<script>
export default {
    data() {
        return {
			array: ["数码","书籍","文具","四六级","考研","教资","日用百货","衣物","鞋子","电器","手机","电脑","美妆洗护","代步工具","床上用品","其他"],
			index: 0,
            formData: {
                goodsName: '',
				goodsClass:'',
				goodsDesc:'',
				goodsPrice:'',
				goodsTime:'',
				qq:'',
				phone:'',
				userImg:'',
				nickName:'',
				userId:'',
				goodsImgs:[]
            },
            rules: {
                // 对name字段进行必填验证
                goodsName: {
                    rules: [{
                            required: true,
                            errorMessage: '请输入物品名',
                        },
                        {
                            minLength: 1,
                            maxLength: 9,
                            errorMessage: '物品名长度在 {minLength} 到 {maxLength} 个字符',
                        }
                    ]
                },
                goodsDesc:{
					rules: [
						{
							required: true,
							errorMessage: "请描述一下你的物品"
						}
					]
				},
				goodsPrice:{
					rules: [
						{
							required: true,
							errorMessage: "请输入价格"
						},
						{
						    minLength: 1,
						    maxLength: 5,
						    errorMessage: '价格在 {minLength} 到 {maxLength} 位数',
						}
					]
				},
				qq:{
					rules: [
						{
							required: true,
							errorMessage: "请输入联系QQ"
						},
						{
						    maxLength: 15,
						    errorMessage: 'QQ不能超过15位数',
						}
					]
				},
				phone:{
					rules: [
						{
							maxLength: 15,
							errorMessage: '电话不能超过15位数',
						}
					]
				}
            }
        }
    },
    methods: {
        /**
         * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
         * @param {String} name 字段名称
         * @param {String} value 表单域的值
         */
        // binddata(name,value){
        // 通过 input 事件设置表单指定 name 的值
        //   this.$refs.form.setValue(name, value)
        // },
        
		bindPickerChange: function(e) {
		            this.index = e.target.value
					this.formData.goodsClass = this.array[e.target.value]
		        },
		// 触发提交表单
        submit() {
            this.$refs.form.submit().then(res=>{
                //console.log('表单数据信息：', res);
				if(this.formData.goodsImgs.length == 0){
					this.formData.goodsImgs.push("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d3327ec4-3b30-4232-8566-8e26348c89eb/4102fa6f-eeb5-45b3-9168-81aae3d262ac.jpg")
				}
				uni.request({
					url:"http://49.232.24.177:3000/goods/publish",
					method:"POST",
					data:this.formData,
					success: (res) => {
						if(res.data.code == 1){
							uni.showToast({
								title:"发布成功"
							})
							setTimeout(function(){
								uni.switchTab({
									url:"../publish"
								})
							},1000)
						}
					}
				})
            }).catch(err =>{
                console.log('表单错误信息：', err);
            })
        },
		chooseImg(){
				var that = this
				uni.chooseImage({
				    count: 9,
				    success(res) {
				        console.log(res);
				        if (res.tempFilePaths.length > 0) {
							let filePath = res.tempFilePaths
							//进行上传操作
							for(let i=0;i<res.tempFilePaths.length;i++){
								uniCloud.uploadFile({
								        filePath: filePath[i],
								cloudPath: 'a.jpg',
								onUploadProgress: function(progressEvent) {
								  console.log(progressEvent);
								  var percentCompleted = Math.round(
								    (progressEvent.loaded * 100) / progressEvent.total
								  );
								        },
								        success(res) {
											let lianjie = res.fileID
											that.formData.goodsImgs.push(lianjie)
											console.log(lianjie)
										},
								        fail() {},
								        complete() {}
								    });
													
							}
				        }
				    }
				});
		},
		removeImg(index){
			this.formData.goodsImgs.splice(index,1)
		},
    },
	onLoad() {
		this.formData.userId = this.$store.state.userInfo._id
		this.formData.userImg = this.$store.state.userInfo.userImg
		this.formData.nickName = this.$store.state.userInfo.nickName
		this.formData.goodsClass = "数码"
		var date = new Date()
		var year = date.getFullYear()
		var month = date.getMonth()+1
		var day = date.getDate()
		var hours = date.getHours()
		var minutes = date.getMinutes()
		var goodsDate = year+"/"+month+"/"+day + " " + hours+":"+minutes
		this.formData.goodsTime = goodsDate
	}
}
</script>
<style lang="scss" scoped>
	.main{
		margin-top: 5px;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	.chooseImg{
		width: 100rpx;
		height: 100rpx;
		margin-bottom: 20rpx;
		image{
			width: 100rpx;
			height: 100rpx;
		}
	}
	.btn{
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 999;
	}
	.imgbox{
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 100rpx;
		&-showImg{
			position: relative;
			margin-left: 10rpx;
			width: 200rpx;
			height: 200rpx;
			&-remove{
				position: absolute;
				width: 50rpx;
				height: 50rpx;
				right: 0;
				z-index: 999;
			}
			&-img{
				width: 200rpx;
				height: 200rpx;
			}
		}
	}
	.goodsType{
		//margin-top: 18rpx;
		height: 36px;
		line-height: 36px;
	}
	.desc{
		margin-top: 8px;
	}
</style>
