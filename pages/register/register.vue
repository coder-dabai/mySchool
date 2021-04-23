<template>
    <view>
        <uni-forms class="main" ref="form" :value="formData" :rules="rules">
				
			<uni-forms-item label="头像" name="userImg" >
				<view class="userImg" @click="chooseUsrImg">
					<image :src="formData.userImg" mode="" ></image>
				</view>
				<uni-easyinput  v-model="formData.userImg" placeholder="" v-show="false" />
			</uni-forms-item>
            <uni-forms-item label="用户名" name="username">
                <uni-easyinput type="text" v-model="formData.username" placeholder="请输入用户名" />
            </uni-forms-item>
            <uni-forms-item label="密码" name="password">
                <uni-easyinput v-model="formData.password" type="password" placeholder="请输入密码" />
            </uni-forms-item>
			<uni-forms-item label="确认密码" name="checkPassword">
			    <uni-easyinput v-model="formData.checkPassword" type="password" placeholder="请再次输入密码" />
			</uni-forms-item>
			<uni-forms-item label="性别" name="gender">
				<radio-group name="radio">
					<label>
						<radio value="1" :checked="formData.gender==='1'" @click="radioClick('1')" /><text>男</text>
					</label>
					<label>
						<radio value="0" :checked="formData.gender==='0'" @click="radioClick('0')" /><text>女</text>
					</label>
				</radio-group>
			</uni-forms-item>
			<uni-forms-item label="昵称" name="nickName">
				<uni-easyinput  v-model="formData.nickName" placeholder="请输入昵称" />
			</uni-forms-item>
            <button @click="submit" type="primary">注册</button>
        </uni-forms>
    </view>
</template>

<script>
	export default {
	    data() {
			var that = this
	        return {
	            formData: {
	                username: '',
					userImg:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d3327ec4-3b30-4232-8566-8e26348c89eb/437b7b65-9412-429d-94ca-a0a5a8006a3a.jpg',
	                password: '',
					checkPassword:'',
					gender:'1',
					nickName:''
					
	            },
	            rules: {
	                // 对name字段进行必填验证
	                username: {
	                    rules: [{
	                            required: true,
	                            errorMessage: '请输入用户名',
	                        },
                        {
                            minLength: 3,
                            maxLength: 9,
                            errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
                        }
	                    ]
	                },
	                // 对密码字段进行必填验证
	                password: {
	                    rules: [{
	                        required:true,
	                        errorMessage: '请输入密码',
	                    },
						{
						        minLength: 3,
						        maxLength: 15,
						        errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
						}
						]
	                },
					checkPassword: {
						rules: [{
							required:true,
							errorMessage:'请再次输入密码'
						},{
                        validateFunction:function(rule,value,data,callback){  //自定义校验规则
                            if (value!=that.formData.password) {
                                callback('密码不一致')
                            }
                            return true
                        }
                    }]
					},
					nickName: {
						rules: [{
							required:true,
							errorMessage:'请输入昵称'
						}]
					}
	            }
	        }
	    },
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
	    methods: {
	        // 触发提交表单
			radioClick(a){
				this.formData.gender = a
			},
	        submit() {
	            this.$refs.form.submit().then(res=>{
	                            uni.request({
	                            	url:"http://49.232.24.177:3000/users/register",
									data:res,
									method:"POST",
									success: (res) => {
										if(res.data.code == 1){
											uni.showToast({
												title:"注册成功,去登陆吧~"
											})
										}else{
											uni.showToast({
												title:"用户名已存在",
												icon:"none"
											})
										}
									}
	                            })
	                        }).catch(err =>{
	                            console.log('表单错误信息：', err);
	                        })
	        },
			chooseUsrImg(){
				var that = this
				console.log("aaa")
				uni.chooseImage({
				    count: 1,
				    success(res) {
				        console.log(res);
				        if (res.tempFilePaths.length > 0) {
				            let filePath = res.tempFilePaths[0]
				            //进行上传操作
				
				            // callback方式，与promise方式二选一即可
				            uniCloud.uploadFile({
				                filePath: filePath,
				        cloudPath: 'b.jpg',
				        onUploadProgress: function(progressEvent) {
				          console.log(progressEvent);
				          var percentCompleted = Math.round(
				            (progressEvent.loaded * 100) / progressEvent.total
				          );
				                },
				                success(res) {
									console.log("连接："+res.fileID)
									that.formData.userImg = res.fileID
									console.log(that.formData.userImg)
								},
				                fail() {},
				                complete() {}
				            })
				
				        }
				    }
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	.userImg{
		image{
			margin-left: 440rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 60rpx;
		}
	}
</style>
