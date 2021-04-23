<template>
    <view>
        <uni-forms class="main" ref="form" :value="formData" :rules="rules">
            <uni-forms-item label="用户名" name="username">
                <uni-easyinput type="text" v-model="formData.username" placeholder="请输入用户名" />
            </uni-forms-item>
            <uni-forms-item label="密码" name="password">
                <uni-easyinput v-model="formData.password" type="password" placeholder="请输入密码" />
            </uni-forms-item>
            <button @click="submit" type="primary">登录</button>
        </uni-forms>
		<view class="toregister">
			<navigator url="../register/register"><text>没有账号？点击注册</text></navigator>
		</view>
    </view>
</template>

<script>
	export default {
	    data() {
	        return {
	            formData: {
	                username: '',
	                password: ''
	            },
	            rules: {
	                // 对用户名字段进行必填验证
	                username: {
	                    rules: [{
	                            required: true,
	                            errorMessage: '请输入用户名',
	                        }
	                    ]
	                },
	                // 对密码字段进行必填验证
	                password: {
	                    rules: [{
	                        required:true,
	                        errorMessage: '请输入密码',
	                    }]
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
	        // 触发提交表单
	        submit() {
				var that = this
	            that.$refs.form.submit().then(res=>{
	                uni.request({
	                	url:'http://49.232.24.177:3000/users/login',
						method:"POST",
						data:res,
						success: (response) => {
							if(response.data.code == 1){
								that.$store.commit('setuser',response.data.data[0])
								uni.switchTab({
									url:"../index/index"
								})
							}else{
								uni.showToast({
									title:"用户名或密码错误",
									icon:"none"
								})
							}
						}
	                })
	            }).catch(err =>{
	                console.log('表单错误信息：', err);
	            })
	        }
	    }
	}
</script>

<style lang="scss" scoped>
	.main{
		margin-top: 100rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	.toregister{
		margin: 20rpx;
		width: 100%;
		height: auto;
		text-align: center;
		// &-a{
		// 	text-decoration: none;
		// }
	}
</style>
