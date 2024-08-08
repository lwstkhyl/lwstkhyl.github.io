//若想使页面跳转时滑动而不是直接跳过去，在CSS里添加html {scroll-behavior: smooth;}即可

//第一段程序：页面滑动到分类及焦点图时，可以显示/隐藏导航；点击“返回”按钮回到页面顶部
(function () {
    //页面滑动到分类及焦点图时，可以显示/隐藏导航
    const entry = document.querySelector('.xtx_entry'); //分类及焦点图
    const elevator = document.querySelector('.xtx-elevator'); //电梯导航
    window.addEventListener('scroll', function () {
        const scroll_distance = document.documentElement.scrollTop;
        if (scroll_distance >= entry.offsetTop) //滚动距离>=分类及焦点图距页面顶部距离
            elevator.style.opacity = 1; //显示
        else
            elevator.style.opacity = 0; //隐藏
        //以上if语段可以简写为
        //elevator.style.opacity = scroll_distance >= entry.offsetTop ? 1 : 0;
    });
    //点击“返回”按钮回到页面顶部
    const backTop = document.querySelector('#backTop');
    backTop.addEventListener('click', function () {
        const active = document.querySelector('.xtx-elevator-list .active');//先获取active类，如果有就移除，没有就不作处理
        if (active) //点击顶部后清除其它li的活跃状态
            active.classList.remove('active');
        can_active = false;  //----禁止其它li活跃
        let timer = setInterval(function () {//-
            can_active = true;//-
            clearInterval(timer);//-
        }, 1000); //-----1s后恢复正常状态
        document.documentElement.scrollTop = 0;
    });
})();
//第二段程序：点击导航栏，跳转到对应栏目
(function () {
    let can_active = true; //----是否可以根据页面滑动选择li的活跃状态（防止点li跳转时不应活跃的li在滑动过程中活跃）
    let shoule_scrollTop = 0; //----应该滑到哪里
    //使用事件委托，选择4个小li的父类进行事件监听
    const elevator_list = document.querySelector('.xtx-elevator-list');
    elevator_list.addEventListener('click', function (e) {
        can_active = false; //----
        if (e.target.tagName == 'A' && e.target.dataset.name)//不能影响到之前写好的“返回”按钮，需判断点击的是不是有data-name的小a
        { //因为初始状态没有active类型，不能使用之前的排他思想
            const active = document.querySelector('.xtx-elevator-list .active');//先获取active类，如果有就移除，没有就不作处理
            if (active) //没有时返回null，值为false
                active.classList.remove('active'); //有就移除
            e.target.classList.add('active'); //将点击的那个li变为活跃状态
            //获取点击的小li与各个栏目的对应关系：发现小li的data-name与各栏目的class名有关系
            const data_name = e.target.dataset.name; //小li的data-name
            const panel = document.querySelector(`.xtx_goods_${data_name}`); //获得对应的栏目
            shoule_scrollTop = panel.offsetTop; //----
            document.documentElement.scrollTop = panel.offsetTop; //滚动到栏目的位置
            console.log("panel.offsetTop:" + panel.offsetTop); //----
            if (parseInt(document.documentElement.scrollTop) == parseInt(shoule_scrollTop)) //----
                can_active = true; //--防止多次点击同一li时不滑动而不改变can_active
        }
    });

    //第三段程序：根据页面所在位置，将导航栏的对应部分自动选中
    window.addEventListener('scroll', function () {
        //console.log(document.documentElement.scrollTop); //----
        if (parseInt(document.documentElement.scrollTop) == shoule_scrollTop) //----
            can_active = true; //-滑动到位时改变can_active

        if (can_active) {//----
            //首先：当页面发生滚动时，要把导航栏原来active的部分移除active状态
            const active = document.querySelector('.xtx-elevator-list .active');
            if (active) active.classList.remove('active');
            //当页面滑动到对应位置时自动选中
            const new_panel = document.querySelector('.xtx_goods_new');
            const popular_panel = document.querySelector('.xtx_goods_popular');
            const brand_panel = document.querySelector('.xtx_goods_brand');
            const topic_panel = document.querySelector('.xtx_goods_topic');
            const scroll_distance = document.documentElement.scrollTop; //当前位置
            if (scroll_distance >= new_panel.offsetTop && scroll_distance < popular_panel.offsetTop) {
                document.querySelector('[data-name=new]').classList.add('active');
            }
            else if (scroll_distance >= popular_panel.offsetTop && scroll_distance < brand_panel.offsetTop) {
                document.querySelector('[data-name=popular]').classList.add('active');
            }
            else if (scroll_distance >= brand_panel.offsetTop && scroll_distance < topic_panel.offsetTop) {
                document.querySelector('[data-name=brand]').classList.add('active');
            }
            else if (scroll_distance >= topic_panel.offsetTop) {
                document.querySelector('[data-name=topic]').classList.add('active');
            }
        }//----
    });
})();

