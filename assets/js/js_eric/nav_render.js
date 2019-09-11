/**
 * @time  2019/9/5 23:02
 * @author  Eric Wang <vuejs@vip.qq.com>
 * @desc  导航渲染算法
 */
;(_ => {
    // 初始化请求连接
    // const http = new HttpRequest("https://08e9edc5-cd62-413e-86a2-5e25adc251ba.mock.pstmn.io");

    // 核心代码
    //  console.log(axios)
    // axios.get("http://websitdevelopment.cn:85/_data/nav_list.json").then(data => {
    //     console.log(data)
    // });
    $(() => {
        $(".content").load("./pages/home.html");

        // 点击左侧导航页面跳转， 大家在本地开发的时候可以随意改动下面的链接，但是不要忘记提交的时候改回来
        const loadPage = (pageName) => {
            switch (pageName) {

                // 顾客管理
                case "customer_management" :
                    $(".content").load("./pages/customer_management.html");
                    break;

                // 员工管理
                case "employee_management" :
                    $(".content").load("./pages/employee_management.html");
                    break;
                case "classification_management" :
                    $(".content").load("./pages/classification_management.html");
                    break;
                case "product_management" :
                    $(".content").load("./pages/product_management.html");
                    break;
                case "order_management" :
                    $(".content").load("./pages/order_management.html");
                    break;

                // 评论管理
                case "comment_management" :
                    $(".content").load("./pages/comment_management.html");
                    break;
            }
        };

        // 点击 面包屑导航改变样式函数
        const changeStyle = () => {
            // 点击主页加载
            $("#home_nav").click(() => {
                $("#home_nav").next().remove();

                $(".content").load("./pages/home.html");
            })

            // 点击主页鼠标点击
            $("#home_nav").mousedown(() => {
                $("#home_nav").css({
                    color: "#2d8cf0"
                });
            });

            // 点击主页鼠标松开
            $("#home_nav").mouseup(() => {
                $("#home_nav").css({
                    color: "#515a6e"
                });
            });

        }

        const getJson = async function () {

            // 同步处理异步请求
            // const getJson = await axios.get("http://websitdevelopment.cn:85/_data/nav_list.json");
            const getJson = [
                {
                    "name": "顾客管理",
                    "icon": "icon-tubiao_gukeguanli",
                    "mark": "customer_management"
                },
                {
                    "name": "员工管理",
                    "icon": "icon-yuangongguanli",
                    "mark": "employee_management"
                },
                {
                    "name": "分类管理",
                    "icon": "icon-ziyuan",
                    "mark": "classification_management"
                },
                {
                    "name": "产品管理",
                    "icon": "icon-chanpin",
                    "mark": "product_management"
                },
                {
                    "name": "订单管理",
                    "icon": "icon-dingdan",
                    "mark": "order_management"
                },
                {
                    "name": "评论管理",
                    "icon": "icon-pinglun",
                    "mark": "comment_management"
                }
            ];
            // 初始化列表DOM
            let navDom = "";
            let key = "_v1413";
            await getJson.map((item, index) => {
                navDom += `<li ${key + index} data-name="${item.mark}">
                     <a onclick="javascript:void(0)">
                    <span class=" iconfont ${item.icon}"></span>
                    &nbsp;
                    ${item.name}
                    </a>
                    </li>`;
            });

            // 追加DOM
            await $(".nav_list").append(
                `
                   <ul>
                     ${navDom}
                  </ul>
                 `
            );

            // 初始化内容区域面包屑导航
            await $(".header[_header]").append(
                `
                 <a id="home_nav" onclick="javascript:void(0)"><span class="icon-zhuye iconfont"></span> &nbsp;主页</a>
                `
            );

            await changeStyle();

            let _this = null;
            let navQueue = [];
            // 初始化左侧导航激活状态
            await $("li").click(function () {
                // console.log(this === _this);
                // 理一理思路，如果两个this相同，那么我就不做任何操作，不过不同，上一个点过的this应该变原色
                // 也就是第一次的话，他也不同，

                if (_this !== this) {
                    $(_this).css({
                        backgroundColor: "#001529",
                        color: "#b3b9bf"
                    });

                    $(this).css({
                        color: "#2d8cf0",
                        backgroundColor: "#000c17"
                    });

                    // 队列入队
                    navQueue.push(`
                       <span>
                       &nbsp; <span style="color: #dcdee2">/</span> &nbsp;
                       <a onclick="javascript:void(0)">
                         ${$(this).html()}
                       </a>
                       </span>
                    `);

                    // 主页面包屑追加DOM
                    $("#home_nav").next().remove();

                    // 追加
                    $("#home_nav")
                        .after(navQueue[0]);
                } else {
                    // will do something
                }

                loadPage($(this).attr("data-name"));

                // 队列出队
                navQueue.pop();
                _this = this;
            })
        };
        getJson().then(data => {
            // console.log(data)
        })
            .catch(err => Promise.reject(err));

        const renderHeader = () => {

        }
    })

})();

