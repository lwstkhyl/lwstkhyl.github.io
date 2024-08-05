$(function () {
    const input = $("#title"); //文本框对象
    function get_data() { //读取本地存储中数据，返回数组
        const data = localStorage.getItem("todolist");
        if (data != null) return JSON.parse(data); //如果有数据，转为数组返回
        else return []; //没有就返回空数组
    }
    function sava_data(data) { //将数组data保存入本地存储中
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    const ol = $("ol"); //"正在进行"列表
    const ul = $("ul"); //"已经完成"列表
    const list = $("ul,ol"); //ul和ol
    function load() { //本地存储数据渲染加载到页面
        list.empty(); //清空原有数据
        const data = get_data(); //得到本地存储中的数据（以数组形式）
        let todo_count = 0, done_count = 0; //两个计数变量
        $.each(data, function (index, val) {
            if (val.done == false) { //如果没完成就是添加到"正在进行"列表
                ol.prepend(`
                    <li>
                        <input type="checkbox" name="" id="">
                        <p>${val.title}</p>
                        <a href="#" id="${index}"></a>
                    </li>
                `);
                todo_count++; //正在进行的个数+1
            }
            else { //如果完成就是添加到"已经完成"列表
                ul.prepend(`
                    <li>
                        <input type="checkbox" name="" id="" checked='checked'>
                        <p>${val.title}</p>
                        <a href="#" id="${index}"></a>
                    </li>
                `); //checked='checked'必须写，要不复选框状态不会更改（始终为false），使本地存储中done也一直为false
                done_count++; //已经完成的个数+1
            }
        });
        $("#todocount").text(todo_count);
        $("#donecount").text(done_count); //修改对应元素值
    }
    load(); //进入页面时就加载一次
    input.on("keydown", function (e) { //按回车把新数据添加到本地存储中
        if (e.keyCode == 13) {
            const text = input.val(); //文本框中输入的值
            if (text.trim() == "") { //如果输入内容为空
                input.val(""); //清空输入框
                return alert("输入内容不能为空");
            }
            let local_data = get_data(); //旧数据
            local_data.push({ title: text, done: false }); //向数组中添加值
            sava_data(local_data); //保存数据
            input.val(""); //清空输入框
            load(); //渲染页面
        }
    });
    list.on("click", "a", function () { //删除事件绑定在a上
        let data = get_data(); //得到本地存储中的数据（以数组形式）
        const index = $(this).attr("id"); //获取a的索引
        data.splice(index, 1); //删除对应数据
        sava_data(data); //保存到本地存储中
        load(); //重新渲染页面
    });
    list.on("click", "input", function () { //切换状态事件绑定在input复选框上
        let data = get_data(); //得到本地存储中的数据（以数组形式）
        const index = $(this).siblings("a").attr("id"); //获取input的索引，即它的兄弟a的自定义数据
        data[index].done = $(this).prop("checked"); //修改对应数据的done为当前复选框的checked状态
        sava_data(data); //保存到本地存储中
        load(); //重新渲染页面
    });
});