<template lang="html">
    <div class="container">
       
        <el-amap class="amap-box"
          :amap-manager="amapManager"
          :vid="'amap-vue'"
          :zoom="zoom"
          :plugin="plugin"
          :center="center"
          :events="events"
        >
          <!-- 标记 -->
          <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
        </el-amap>
      </div>
  </template>
  
  <script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
let amapManager = new AMapManager();
export default {
  data() {
    let self = this;
    return {
      address: null,
      searchKey: "",
      amapManager,
      markers: [],
      searchOption: {
        city: "全国",
        citylimit: true,
      },
      center: [121.329402, 31.228667],
      zoom: 17,
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        // 点击获取地址的数据
        click(e) {
          // console.log(e)
          self.markers = [];
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.center = [lng, lat];
          self.markers.push([lng, lat]);
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
          });
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                console.log(result.regeocode.formattedAddress);
                self.address = result.regeocode.formattedAddress;
                self.searchKey = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        },
      },
      // 一些工具插件
      plugin: [
        // {
        //   pName: 'Geocoder',
        //   events: {
        //     init (o) {
        //       console.log(o.getAddress())
        //     }
        //   }
        // },
        {
          // 定位
          pName: "Geolocation",
          events: {
            init(o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng;
                  // 设置维度
                  self.lat = result.position.lat;
                  // 设置坐标
                  self.center = [self.lng, self.lat];
                  self.markers.push([self.lng, self.lat]);
                  // load
                  self.loaded = true;
                  // 页面渲染好后
                  self.$nextTick();
                }
              });
            },
          },
        },
        {
          // 工具栏
          pName: "ToolBar",
          events: {
            init(instance) {
              // console.log(instance);
            },
          },
        },
        {
          // 鹰眼
          pName: "OverView",
          events: {
            init(instance) {
              // console.log(instance);
            },
          },
        },
        {
          // 地图类型
          pName: "MapType",
          defaultType: 0,
          events: {
            init(instance) {
              // console.log(instance);
            },
          },
        },
        {
          // 搜索
          pName: "PlaceSearch",
          events: {
            init(instance) {
              // console.log(instance)
            },
          },
        },
      ],
    };
  },
  methods: {

  },
};
</script>

<style lang="css">
.container {
  height: 500px;
}

.tip-box {
  width: 100%;
  max-height: 260px;
  position: absolute;
  top: 30px;
  overflow-y: auto;
  background-color: #fff;
}
</style>
