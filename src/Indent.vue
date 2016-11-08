<template>
    <div>
        <header class="header_title">
            <!-- 超额提示和遮罩层 -->
            <div  v-if="$route.params.order" class="OverfullDebt success-tips" id="Indent_OverfullDebt">
                <img src="./assets/img/Order_success.gif"/>
                <p class="Order_Success_Text">订货成功</p>
            </div>
            <div  v-if="$route.params.order" class="shade success-tips" id="Indent_shade"></div>
            <!-- 超额提示和遮罩层 End-->

            <span>我的账单</span>
        </header>

        <section>
            <div v-for="item in billings">
                <div class="bill">
                    <p>总 金 额：<span>{{item.total_amount}}元</span></p><button v-if="!item.is_paied"><a href="/billings/pay">立即支付</a></button>
                </div>

                <div class="indent_content" v-for="order in item.order_list">
                    <div class="box_one"><span class="box_one_left">配送日期：</span><span class="box_one_right">{{order.delivery_date}}</span></div>
                    <div class="box_one"><span class="box_one_left">总 &nbsp;金 &nbsp;额：</span><span class="box_one_right">{{order.total_amount}}</span><span class="box_one_right">元</span></div>
                    <div id="Go_indent_details">
                        <router-link :to="{name:'detail', params:{id:order.order_id}}">
                            <div class="indent_right" v-if="!order.is_paied">未支付</div>
                            <div class="indent_right" v-if="order.is_paied">已支付</div>
                            <img src="./assets/img/skip.png" class="right_button"/>
                        </router-link>
                    </div>
                    <div class="border_bottom"></div>
                </div>
            </div>




            <!--以下是第二个账单，可以删除.-->
            <!--<div class="indent_content">
                <div class="box_one"><span class="box_one_left">配送日期：</span><span class="box_one_right">2016-11-04</span></div>
                <div class="box_one"><span class="box_one_left">总 &nbsp;金 &nbsp;额：</span><span class="box_one_right">11.58</span><span class="box_one_right">元</span></div>
                <div id="Go_indent_details">
                    <a>
                        <div class="indent_right">未支付</div>
                        <div class="indent_right" style="display: none;">已支付</div>
                        <img src="./assets/img/skip.png" class="right_button"/>
                    </a>
                </div>
                <div class="border_bottom"></div>
            </div>-->

        </section>
        <footer>
            <!-- 以下是底部导航 -->
            <div class="index_bottom">
                <div class="index_bottom_left">
                    <dl>
                        <dt>
                            <img src="./assets/img/cart.gif"/>
                        </dt>
                        <dd><p><router-link to="/">订购</router-link></p></dd>
                    </dl>
                </div>
                <div class="cut-off"></div>
                <div class="index_bottom_right">
                    <dl>
                        <dt>
                            <img src="./assets/img/bill_active.gif"/>
                        </dt>
                        <dd><p>账单</p></dd>
                    </dl>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
module.exports = {
    data: function () {
        return {
            billings: []
        }
    },
    created: function () {
        this.fetchData();
        setTimeout(function(){
            var nodes = document.getElementsByClassName('success-tips');
            for (i in nodes) {
                node = nodes[i];
                if (node.style) {
                    node.style.display = 'none';
                }
            }
        }, 1500)
    },
    methods: {
        fetchData: function () {
            this.$http.get('http://api-test.shangcars.com/billings?token='+localStorage.token).then(function (res) {
                if (res.body.err_code == 0) {
                    this.billings = res.body.billings;
                }
            }, function (res) {});
        }
    }
}
</script>
