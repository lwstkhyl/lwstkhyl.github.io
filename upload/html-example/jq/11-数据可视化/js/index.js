//监控区域--tab栏切换
(function () {
    const tabs = $(".monitor .tabs"); //tab栏
    const content = $(".monitor .content");  //内容（共两个）
    //事件委托，将点击事件绑在.tabs上
    tabs.on("click", "a", function () {
        $(this).addClass("active").siblings("a").removeClass("active"); //点击后添加active类，其它a移除
        const index = $(this).index(); //点击的是第几个a
        content.eq(index).show().siblings(".content").hide(); //相应的content显示，其它content隐藏
    });
})();
//监控区域--无缝滚动
(function () {
    const marquee = $(".marquee-view .marquee"); //要滚动的区域（共两个）
    marquee.each(function () { //使用each遍历
        const new_row = $(this).children().clone(); //复制所有的行（marquee子元素）
        $(this).append(new_row); //添加到marquee中
    });
})();
//点位分布统计--南丁格尔玫瑰图
(function () {
    const my_echart = echarts.init(document.querySelector(".point .pie")); //实例化echarts对象
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        series: [
            {
                name: '点位统计',
                type: 'pie',
                radius: ['10%', '80%'],
                center: ['50%', '50%'],
                roseType: 'radius',
                data: [
                    { value: 20, name: "云南" },
                    { value: 26, name: "北京" },
                    { value: 24, name: "山东" },
                    { value: 25, name: "河北" },
                    { value: 20, name: "江苏" },
                    { value: 25, name: "浙江" },
                    { value: 30, name: "四川" },
                    { value: 42, name: "湖北" }
                ],
                label: {
                    fontSize: 10,
                },
                labelLine: {
                    length: 6,
                    length2: 8
                }
            }
        ]
    }; //配置项
    my_echart.setOption(option); //指定配置项
    window.addEventListener("resize", function () { //窗口尺寸改变，刷新图表大小
        my_echart.resize();
    });
})();
//全国用户总量统计--柱状图
(function () {
    const my_echart = echarts.init(document.querySelector(".users .bar")); //实例化echarts对象
    const item = {
        name: "", //柱子的名称
        value: 1200, //柱子的值
        itemStyle: {
            color: "#254065" //柱子的颜色
        },
        emphasis: { //鼠标移入时不高亮显示
            itemStyle: {
                color: "#254065" //设为与柱子的颜色相同即可
            }
        },
        tooltip: { //鼠标移入时不显示提示框
            extraCssText: "opacity: 0" //将提示框的opacity设为0即可
        }
    };
    let option = {
        color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1, //从(x1,y1)->(x2,y2)进行渐变
            [
                { offset: 0, color: '#00fffb' }, //起始颜色
                { offset: 1, color: '#0061ce' } //结束颜色
            ]
        ),
        tooltip: {
            trigger: 'item',
        },
        grid: {
            left: '0%',
            right: '3%',
            bottom: '3%',
            top: '3%',
            containLabel: true, //要显示刻度，不能溢出
            show: true, //显示坐标系矩阵边框
            borderColor: 'rgba(0, 240, 255, 0.3)' //设置边框颜色
        },
        xAxis: [
            {
                type: 'category',
                data: [
                    "上海",
                    "广州",
                    "北京",
                    "深圳",
                    "合肥",
                    "",
                    "......",
                    "",
                    "杭州",
                    "厦门",
                    "济南",
                    "成都",
                    "重庆"
                ],
                axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLabel: {
                    color: "#4c9bfd"
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0, 240, 255, 0.3)"
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLabel: {
                    color: "#4c9bfd"
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0, 240, 255, 0.3)"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(0, 240, 255, 0.3)"
                    }
                }
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [
                    2100,
                    1900,
                    1700,
                    1560,
                    1400,
                    item,
                    item,
                    item,
                    900,
                    750,
                    600,
                    480,
                    240
                ]
            }
        ]
    }; //配置项
    my_echart.setOption(option); //指定配置项
    window.addEventListener("resize", function () { //窗口尺寸改变，刷新图表大小
        my_echart.resize();
    });
})();
//订单模块--tab栏切换
(function () {
    const tabs = $(".order .filter"); //tab栏
    const content = $(".order .data");  //内容（共4个）
    //事件委托，将点击事件绑在.tabs上
    tabs.on("click", "a", function () {
        $(this).addClass("active").siblings("a").removeClass("active"); //点击后添加active类，其它a移除
        const index = $(this).index(); //点击的是第几个a
        content.eq(index).show().siblings(".data").hide(); //相应的content显示，其它content隐藏
    });
})();
//销售额统计--折线图
(function () {
    const data = { //数据
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    };
    const my_echart = echarts.init(document.querySelector(".sales .line")); //实例化echarts对象
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            right: '10%',
            textStyle: {
                color: '#4c9bfd'
            },
            data: ['Email', 'Union Ads']
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,
            borderColor: '#012f4a',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            boundaryGap: true,
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            }
        },
        color: ['#00f2f1', 'ed3f35'],
        series: [
            {
                name: '预期销售额',
                type: 'line',
                smooth: true,
                data: data.year[0]
            },
            {
                name: '实际销售额',
                type: 'line',
                smooth: true,
                data: data.year[1]
            }
        ]
    }; //配置项
    my_echart.setOption(option); //指定配置项
    //tab栏切换
    const a_list = $(".sales .caption a"); //所有a标签
    a_list.on("click", function () {
        $(this).addClass("active").siblings("a").removeClass("active"); //点击后添加active类，其它a移除
        const type = $(this).attr("data-type"); //点击的是哪个a
        option["series"][0]["data"] = data[type][0];
        option["series"][1]["data"] = data[type][1]; //更改option
        my_echart.setOption(option); //重新指定配置项
    });
    //每隔一段时间自动tab栏切换
    let timer = setInterval(function () {
        const active_a = $(".sales .caption a.active"); //当前a标签
        const active_index = a_list.index(active_a); //当前是第几个a标签
        const next_index = active_index === 3 ? 0 : active_index + 1; //下一个切换到的a标签索引
        a_list.eq(next_index).click(); //切换到（点击）下一个a标签
    }, 1000);
    //鼠标经过停止定时器
    $(".sales").hover(function () {
        clearInterval(timer);
    }, function () {
        if (timer) clearInterval(timer);
        timer = setInterval(function () {
            const active_a = $(".sales .caption a.active");
            const active_index = a_list.index(active_a);
            const next_index = active_index === 3 ? 0 : active_index + 1;
            a_list.eq(next_index).click();
        }, 1000);
    });

    //另一种方法：
    // //tab栏切换
    // const a_list = $(".sales .caption a"); //所有a标签
    // let index = 0;
    // a_list.on("click", function () {
    //     index = $(this).index() - 1; //更新index
    //     $(this).addClass("active").siblings("a").removeClass("active");
    //     const type = $(this).attr("data-type"); //点击的是哪个a
    //     option["series"][0]["data"] = data[type][0];
    //     option["series"][1]["data"] = data[type][1]; //更改option
    //     my_echart.setOption(option); //重新指定配置项
    // });
    // //每隔一段时间自动tab栏切换
    // let timer = setInterval(function () {
    //     index++;
    //     if (index >= 4) index = 0;
    //     a_list.eq(index).click();
    // }, 1000);
    // //鼠标经过停止定时器
    // $(".sales").hover(
    //     function () {
    //         clearInterval(timer);
    //     },
    //     function () {
    //         clearInterval(timer);
    //         timer = setInterval(function () {
    //             index++;
    //             if (index >= 4) index = 0;
    //             a_list.eq(index).click();
    //         }, 1000);
    //     }
    // );

    //窗口尺寸改变，刷新图表大小
    window.addEventListener("resize", function () {
        my_echart.resize();
    });
})();
//渠道分布--雷达图
(function () {
    const my_echart = echarts.init(document.querySelector(".channel .radar")); //实例化echarts对象
    let option = {
        tooltip: {
            show: true,
            position: ['60%', '10%']
        },
        radar: {
            radius: '65%',
            center: ['50%', '50%'],
            indicator: [
                { name: "机场", max: 100 },
                { name: "商场", max: 100 },
                { name: "火车站", max: 100 },
                { name: "汽车站", max: 100 },
                { name: "地铁", max: 100 }
            ],
            shape: 'circle',
            splitNumber: 4,
            name: {
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        },
        series: [
            {
                name: '北京',
                type: 'radar',
                lineStyle: {
                    color: '#fff',
                    width: 1,
                    opacity: 0.5
                },
                data: [[90, 19, 56, 11, 34]],
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    color: '#fff'
                },
                label: {
                    show: true,
                    color: '#fff', //颜色
                    fontSize: 10 //字体大小
                },
                areaStyle: {
                    color: 'rgba(238, 197, 102, 0.6)'
                }
            }
        ]
    }; //配置项
    my_echart.setOption(option); //指定配置项
    window.addEventListener("resize", function () { //窗口尺寸改变，刷新图表大小
        my_echart.resize();
    });
})();
//销售进度--半圆环状饼状图
(function () {
    const my_echart = echarts.init(document.querySelector(".quarter .gauge")); //实例化echarts对象
    let option = {
        hoverOffset: 0,
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['130%', '150%'],
                center: ['48%', '80%'],
                labelLine: {
                    show: false //不显示连接线
                },
                startAngle: 180,
                hoverOffset: 0,
                data: [
                    {
                        value: 100,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                                    { offset: 1, color: "#005fc1" } // 1 结束颜色
                                ]
                            )
                        }
                    },
                    {
                        value: 100,
                        itemStyle: {
                            color: "#12274d"
                        }
                    },
                    {
                        value: 200,
                        itemStyle: {
                            color: 'transparent'
                        }
                    },
                ]
            }
        ]
    }; //配置项
    my_echart.setOption(option); //指定配置项
    window.addEventListener("resize", function () { //窗口尺寸改变，刷新图表大小
        my_echart.resize();
    });
})();
//全国热榜的数据
const hotData = [
    {
        city: "北京", //城市
        sales: "25,179", //销售额
        flag: true, //上升true还是下降false
        brands: [ //品牌种类数据
            { name: "可爱多", num: "9,086", flag: true },
            { name: "娃哈哈", num: "8,341", flag: true },
            { name: "喜之郎", num: "7,407", flag: false },
            { name: "八喜", num: "6,080", flag: false },
            { name: "小洋人", num: "6,724", flag: false },
            { name: "好多鱼", num: "2,170", flag: true }
        ]
    },
    {
        city: "河北",
        sales: "23,252",
        flag: false,
        brands: [
            { name: "可爱多", num: "3,457", flag: false },
            { name: "娃哈哈", num: "2,124", flag: true },
            { name: "喜之郎", num: "8,907", flag: false },
            { name: "八喜", num: "6,080", flag: true },
            { name: "小洋人", num: "1,724", flag: false },
            { name: "好多鱼", num: "1,170", flag: false }
        ]
    },
    {
        city: "上海",
        sales: "20,760",
        flag: true,
        brands: [
            { name: "可爱多", num: "2,345", flag: true },
            { name: "娃哈哈", num: "7,109", flag: true },
            { name: "喜之郎", num: "3,701", flag: false },
            { name: "八喜", num: "6,080", flag: false },
            { name: "小洋人", num: "2,724", flag: false },
            { name: "好多鱼", num: "2,998", flag: true }
        ]
    },
    {
        city: "江苏",
        sales: "23,252",
        flag: false,
        brands: [
            { name: "可爱多", num: "2,156", flag: false },
            { name: "娃哈哈", num: "2,456", flag: true },
            { name: "喜之郎", num: "9,737", flag: true },
            { name: "八喜", num: "2,080", flag: true },
            { name: "小洋人", num: "8,724", flag: true },
            { name: "好多鱼", num: "1,770", flag: false }
        ]
    },
    {
        city: "山东",
        sales: "20,760",
        flag: true,
        brands: [
            { name: "可爱多", num: "9,567", flag: true },
            { name: "娃哈哈", num: "2,345", flag: false },
            { name: "喜之郎", num: "9,037", flag: false },
            { name: "八喜", num: "1,080", flag: true },
            { name: "小洋人", num: "4,724", flag: false },
            { name: "好多鱼", num: "9,999", flag: true }
        ]
    }
];
//全国热榜--数据渲染
(function () {
    //各省热销部分
    const sup = $(".top .province ul.sup"); //sup元素
    $.each(hotData, function (index, item) { //遍历hotData数组
        const li = `
            <li>
                <span>${item.city}</span>
                <span>${item.sales} <s class="${item.flag ? "icon-up" : "icon-down"}"></s></span>
            </li>
        `; //创建li
        sup.append(li); //添加
    });
    //"近30日"部分
    const sub = $(".top .province ul.sub"); //sub元素
    function update_sub(li_in_sup) { //根据sup中的li渲染sub盒子内容
        li_in_sup.addClass("active").siblings("li").removeClass("active"); //点击后添加active类，其它li移除
        const index = li_in_sup.index(); //经过的是第几个li
        const brands = hotData[index].brands; //获取对应的brands数组
        sub.html(""); //先清除原有内容，再添加新内容
        $.each(brands, function (index, item) { //遍历brands数组
            const li = `
                <li>
                    <span>${item.name}</span>
                    <span>${item.num} <s class="${item.flag ? "icon-up" : "icon-down"}"></s></span>
                </li>
            `; //创建li
            sub.append(li); //添加
        });
    }
    sup.on("mouseenter", "li", function () { //为sup中的li绑定鼠标经过事件
        update_sub($(this));
    });
    //默认激活第一个标签
    const sup_li = $(".top .province ul.sup li"); //sup中所有的li标签
    sup_li.eq(0).mouseenter();
    //每隔一段时间自动tab栏切换
    let timer = setInterval(function () {
        const active_li = $(".top .province ul.sup li.active"); //当前li标签
        const active_index = sup_li.index(active_li); //当前是第几个li标签
        const next_index = active_index === 4 ? 0 : active_index + 1; //下一个切换到的li标签索引
        update_sub(sup_li.eq(next_index)); //渲染sub
    }, 1000);
    //鼠标经过停止定时器
    sup.hover(function () {
        clearInterval(timer);
    }, function () {
        if (timer) clearInterval(timer);
        timer = setInterval(function () {
            const active_li = $(".top .province ul.sup li.active");
            const active_index = sup_li.index(active_li);
            const next_index = active_index === 4 ? 0 : active_index + 1;
            update_sub(sup_li.eq(next_index)); //渲染sub
        }, 1000);
    });
})();