<!-- 首页推荐组件 -->
<template>
	<view>
		<list-header>
			<template #title> 猜你喜欢 </template>
			<template #tips> 更多推荐 </template>
		</list-header>
		<view class="flex align-center">
			<block v-for="(item, index) in Rebooks" :key="index">
				<view class="flex flex-column align-center flex-1 position-relative">
					<image :src="item.src" mode="widthFix" class="w-100"></image>
					<text class="font my-1 text-light-black">{{item.name}}</text>
					<my-icon iconId="icon-erji" iconSize="35" iconColor="text-light-white" class="position-absolute" style="left: 45rpx; top: 20rpx;"></my-icon>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import listHeader from '../listHeader.vue';
	export default {
		props: {
			Rebooks: {
				type: Array
			}
		},
		components: {
			listHeader
		},
	}
</script>

<style>

</style>
