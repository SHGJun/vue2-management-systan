import Vue from 'vue'
import 'reset-css'
import App from './App.vue'
import VueAMap from 'vue-amap';
import store from '@/store'
import router from '@/router'
import '@/plugins/element/index'

Vue.config.productionTip = false

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
  plugin: [ // 这里根据自己项目按需引入插件
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',// 圆形编辑器插件
    "AMap.Geolocation", // 定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.Geocoder", // 地理编码与逆地理编码服务，用于地址描述与坐标间的相互转换
    "AMap.CitySearch",
  ],
  v: '1.4.4'
});

const render = () => {
  const app = new Vue({
    render: h => h(App),
    router,
    store
  })
  app.$mount('#app');
}

render();