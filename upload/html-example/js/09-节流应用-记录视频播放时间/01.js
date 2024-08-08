//利用视频/音频DOM对象的两个属性
//ontimeupdate--在视频/音频当前的播放位置发生改变时执行该属性对应的函数（很灵敏，播放1s视频会触发多次）
//onloadeddata--在当前帧的数据加载完成且还没有足够的数据播放视频/音频的下一帧时执行该属性对应的函数（一般在刚打开网页，正在加载视频时触发，只执行1次无需节流）
//currentTime--视频/音频已播放的进度，可读可写，写就是指定视频/音频从哪开始播放
const video = document.querySelector('video'); //视频标签
//if (!localStorage.getItem('currentTime')) localStorage.setItem('currentTime', 0); //初始化本地存储currentTime变量
//1、在ontimeupdate事件触发时，每隔1s，就记录当前时间到本地存储
const update_time = () => { //更新本地存储中时间
    localStorage.setItem('currentTime', video.currentTime);
};
video.ontimeupdate = _.throttle(update_time, 1000); //节流，每隔1s存1次
//2、下次打开页面时，onloadeddata事件触发，从本地存储中取出时间，让视频从取出的时间播放
const set_time = () => {
    video.currentTime = localStorage.getItem('currentTime') || 0; //如果获取不到，就说明是第一次播放，从0开始
};
video.onloadeddata = set_time;
set_time(); //其实也可以将设置时间写到外面，因为设置时间函数只会执行1次（页面打开时）
//如果写到onloadeddata内可能出现多次刷新时失效的问题