export default [
    {
        title: "首页",
        path: '/',
    },
    {
        title:'图表',
        path:'/chart'
    },
    {
        title: "地图",
        path: '/map',
        children: [
            {
                title: "百度地图",
                path: '/baiduMap'
            },
            {
                title: "高德地图",
                path: '/gaodeMap'
            },
        ],
    },
]