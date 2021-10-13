<template>
	<view class="content">
		<view :style="{height:`${statusBarHeight}px`}"></view>
		<my-icon iconId="icon-bofangsanjiaoxing"></my-icon>
		<view class="animated faster" style="width: 30rpx;height: 30rpx;" :class="isShow?'pulse':''" @tap="change()">
		</view>
	</view>
</template>

<script>
	import myIcon from '@/components/myIcon.vue';
	export default {
		data() {
			return {
				statusBarHeight:this.$statusBarHeight,
				isShow:false
			}
		},
		components:{
			myIcon
		},
		onLoad() {

		},
		methods: {
			change(){
				this.isShow = !this.isShow
			}
		}
	}
</script>

<style>
</style>
