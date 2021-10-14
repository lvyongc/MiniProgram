//音频资源
import resourecs from './musicResourecs.js';
let musics = resourecs.musicResourecs;

let audio,
	timeout;
export default {
	state: {
		playStatus: false, //播放与暂停标识
		currentPlayIndex: 0, //当前歌曲标识
		durationTime: 0, //音频总时长
		currentTime: 0 //音频播放时刻
	},
	getters: {
		//音频name
		audioName(state) {
			let curIndex = state.currentPlayIndex;
			return musics[curIndex].name
		},
		// 歌手name
		singerName(state) {
			let curIndex = state.currentPlayIndex;
			let singer = musics[curIndex].singer;
			return singer.name
		}
	},
	mutations: {
		// 销毁
		destruction() {
			audio.offPlay();
			audio.offPause();
			audio.offStop();
			audio.offEnded();
			audio.offError()
		},
		// 播放
		audioPlay(state) {
			let curIndex = state.currentPlayIndex;
			audio.src = musics[curIndex].src;
			audio.play()
		},
		// 跳转
		audioSeek(state,pos){
			audio.seek(pos)
		},
		// 暂停
		audioPause() {
			audio.pause()
		},
		//停止
		audioStop() {
			audio.stop()
		},
		//改变播放与暂停标识
		changerPlayStatus(state,Boolean){
			state.playStatus = Boolean
		},
		//改变播放标识
		changePlayIndex(state, index) {
			state.currentPlayIndex = index
		},
		getDurationTime(state,time){
			state.durationTime = time
		},
		//改变当前时间(暂停时)
		changeCurrentTime(state,time){
			state.currentTime = time
		},
	
	},
	actions: {
		//初始化
		init({commit,dispatch}) {
			if (audio) {return}
			audio = uni.createInnerAudioContext(); //实例化audio对象
			// 监听
			//播放事件
			audio.onPlay(() => {
				commit('changerPlayStatus',true)
				commit('getDurationTime',audio.duration)
				console.log('开始播放');
			})
			//暂停事件
			audio.onPause(() => {
				commit('changerPlayStatus',false)
				console.log('暂停播放');
			})
			//停止事件
			audio.onStop(() => {
				commit('changerPlayStatus',false)
				console.log('停止播放');
			})
			//播放结束事件
			audio.onEnded(() => {
				commit('changerPlayStatus',false)
				dispatch('PreOrNext','next')
				console.log('播放结束');
			})
			//播放错误事件
			audio.onError((res) => {
				console.log(res.errMsg);
				commit('changerPlayStatus',false)
				console.log(res.errCode);
			})
			audio.onTimeUpdate(() => {
				commit('changeCurrentTime',audio.currentTime)
			})
		},
		//播放与暂停
		PlayOrPause({state,commit}) {
			if (!state.playStatus) {
				commit('audioPlay')
			} else {
				commit('audioPause')
			}
		},
		//切歌
		PreOrNext({state,commit}, type) {
			commit('audioStop');
			let curIndex = state.currentPlayIndex,
				lastIndex = musics.length - 1;
			switch (type) {
				case 'pre':
					curIndex === 0 ? commit('changePlayIndex', lastIndex) : commit('changePlayIndex', curIndex - 1)
					break;
				case 'next':
					curIndex === lastIndex ? commit('changePlayIndex', 0) : commit('changePlayIndex', curIndex + 1)
					break;
				default:
					break;
			}
			commit('audioPlay')
		},
		sliderToPlay({state,commit},{detail:{value:position}}){
			let time = position;
			commit('audioSeek',position)
			if(!state.playStatus){
				// commit('audioPlay')
				clearTimeout(timeout);
				timeout = setTimeout(()=>commit('changeCurrentTime',time),200)
			}
		}
	}
}
