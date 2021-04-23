<script>
	export default {
		onLaunch: function() {
			let that = this
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
					console.log(res.data.length)
					if(res.data.length>2){
						that.$store.commit("setuser",JSON.parse(res.data))
						uni.switchTab({
							url:"pages/index/index"
						})
					}
			    }
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	*{
	  box-sizing: border-box;
	}
</style>
