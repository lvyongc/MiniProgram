<!-- 分类组件 -->
<template>
	<view class="flex align-center justify-between mx-3 my-4">
		<block v-for="(item,index) in functionSortArr" :key="index">
			<view class="flex flex-column align-center" @tap="switchToPage(index)">
				<my-icon :iconId="item.iconId" :iconColor="item.iconColor" iconSize="65"></my-icon>
				<text class="mt-1 font text-light-black">{{item.name}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	let pageList = {
		[0]:"/pages/readLIst/readLIst",
		[1]:"/pages/listenNoval/listenNoval",
		[2]:"/pages/listenMusic/listenMusic",
		[3]:"/pages/listenKnowledge/listenKnowledge",
	};
	export default {
		props: {
			functionSortArr: {
				type: Array,
				default: () => []
			},
		},
		methods: {
			switchToPage(pageIndex) {
				uni.navigateTo({url: pageList[pageIndex]});
			}
		},
	}
</script>

<style>

</style>
