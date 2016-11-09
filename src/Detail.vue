<template>
    <div>
        <header class="header_title">
            <img src="./assets/img/left.png" v-on:click="detail_back" /><span>订单详情</span>
        </header>
        <section>
            <div class="details">
                <p>订单编号：<span class="num_size_hack">{{order.order_id}}</span></p>
                <p>下单时间：<span class="num_size_hack">{{order.created_at}}</span></p>
                <p>配送日期：<span class="num_size_hack">{{order.delivery_date}}</span></p>
                <p>总 金 额：<span class="num_size_hack">{{order.total_amount}}</span><span>元</span></p>
                <p>订单状态：<span v-if="order.is_paied">已支付</span><span v-if="!order.is_paied">未支付</span></p>
            </div>

            <div class="indent_bottom" v-for="item in order.items">
                <p>{{item.name}}<span class="indent_bottom_right">×{{item.quantity}}</span></p>
                <p><span>单位：{{item.unit}}</span>
                    <span class="indent_bottom_right">
							  		<span>&yen;：</span><span>{{item.price*100*item.quantity/100}}</span>
					</span>
                </p>
                <div class="border_bottom"></div>
            </div>
            <!--以下是第二个订单，可以删除.-->
            <!--<div class="indent_bottom">
                <p>北方馒头（方）<span class="indent_bottom_right">X2</span></p>
                <p>品类：紫薯味<span style="margin-left: 10px;">单位：包</span>
                              <span class="indent_bottom_right">
                                      <span>&yen;：</span><span>19.8</span>
                              </span>
                </p>
                <div class="border_bottom"></div>
            </div>-->



        </section>
        <footer>

        </footer>
    </div>
</template>

<script>
module.exports = {
    data: function () {
        return {
            order: {}
        }
    },
    created: function () {
        this.fetchData();

    },
    methods: {
        fetchData: function (){
            this.$http.get('http://api-test.shangcars.com/order/'+this.$route.params.id+'?token='+localStorage.token).then(function (res) {
                if (res.body.err_code == 0) {
                    this.order = res.body;
                }
            }, function (res) {});
        },
        detail_back: function(){
        	window.history.go(-1);
        }
    }
}
</script>