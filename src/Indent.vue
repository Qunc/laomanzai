<template>
	
    <div>
        <header class="header_title">
            <!-- 订货成功提示和遮罩层 -->
            <div  v-if="$route.params.order_success_tips" class="OverfullDebt success-tips" id="Indent_Overfull">
                <img src="./assets/img/Order_success.gif"/>
                <p class="Order_Success_Text">订货成功</p>
            </div>
            <div  v-if="$route.params.order_success_tips" class="shade success-tips" id="Indent_Shade"></div>
            <!-- 订货成功提示和遮罩层 End-->

            <span>我的账单</span>
        </header>

        <section style="margin-bottom: 50px;">
            <div v-for="item in billings">
                <div class="bill">
                    <p>需支付总金额：<span class="bill_number">{{item.total_amount}}</span><span>元</span></p><a href="/billings/pay"><button v-if="!item.is_paied" id="NowPay">立即支付</button></a>
                </div>

                <div class="indent_content" v-for="order in item.order_list">
                	<div class="box_one"><span class="box_one_left">订货时间：</span><span class="box_one_right num_size_hack">{{order.created_at}}</span></div>
                    <div class="box_one"><span class="box_one_left">配送日期：</span><span class="box_one_right num_size_hack">{{order.delivery_date}}</span></div>
                    <div class="box_one"><span class="box_one_left">订货金额：</span><span class="box_one_right num_size_hack">{{order.total_amount}}</span><span class="box_one_right">元</span></div>
                    <div id="Go_indent_details">
                        <router-link :to="{name:'detail', params:{id:order.order_id}}">
                            <div class="indent_right" v-if="!order.can_edit">查看</div>
                            <div class="indent_right" v-if="order.can_edit">修改</div>
                            <img src="./assets/img/skip.png" class="right_button"/>
                        </router-link>
                    </div>
                    <div class="border_bottom"></div>
                </div>
            </div>

        </section>
        <footer>
            <!-- 以下是底部导航 -->
            <div class="index_bottom">
                <div class="index_bottom_left">
                	<router-link to="/" class="box_left">
	                    <dl>
		                        <dt>
		                            <img src="./assets/img/cart.gif"/>
		                        </dt>
		                        <dd><p>订购</p></dd>
							
	                    </dl>
                    </router-link>
                </div>
            	
                <div class="cut-off"></div>
                <div class="index_bottom_right">
                	<div class="box_right">
	                    <dl>
	                        <dt>
	                            <img src="./assets/img/bill_active.gif"/>
	                        </dt>
	                        <dd><p style="color:#52BE44;">账单</p></dd>
	                    </dl>
                    </div>
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
//          var nodes = document.getElementsByClassName('success-tips');
//          for (i in nodes) {
//              node = nodes[i];
//              if (node.style) {
//                  node.style.display = 'none';
//              }
//          }
			var Indent_Shade = document.getElementById('Indent_Shade');
			var Indent_Overfull = document.getElementById('Indent_Overfull');
				if (Indent_Shade && Indent_Overfull) {
					Indent_Shade.style.display = 'none';
					Indent_Overfull.style.display = 'none';
				}
        }, 3000)
    },
    methods: {
        fetchData: function () {
            this.$http.get(API_BASE_URL + '/billings?token='+localStorage.token).then(function (res) {
                if (res.body.err_code == 0) {
                    this.billings = res.body.billings;
                }
            }, function (res) {});
        }
    }
}
</script>
