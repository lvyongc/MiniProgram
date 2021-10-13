<!-- 列表组件 -->
<template>
	<view>
		<block v-for="(item, index) in bookListArr" :key="index">
			<view class="flex align-center p-1 border-bottom" hover-class="bg-light" style="height: 320rpx;">
				<image :src="item.imgurl" mode="aspectFill" class="rounded mx-2" style="width: 250rpx;height: 250rpx;"></image>
				<view class="flex-1" style="height: 100%;">
					<view class="py-2 font-md font-weight-bold"> {{item.name}} </view>
					<view class="font text-light-black"> {{item.synopsis}} </view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			bookListArr: {
				type: Array,
				default: ()=>[]
			},
		},
	}
</script>

<style>

</style>
