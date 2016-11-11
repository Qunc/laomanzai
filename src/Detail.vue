<template>
    <div>
        <header class="header_title">

            <img src="./assets/img/left.png" v-on:click="detail_back" /><span>订单详情</span>

        </header>
        <section>
        	<div class="Detail_Tips">
        		<div class="Detail_Tips_left">如需新增商品，请执行：</div>
        		<div class="Detail_Tips_right">
        			<ol>
        				<li>回到订购页</li>
        				<li>清零商品数量</li>
        				<li>输入所需要的商品数量，“一键订货”</li>
        			</ol>
        		</div>
        		
        	</div>
            <div class="details">
                <p>订单编号：<span class="num_size_hack">{{order.order_id}}</span></p>
                <p>订货时间：<span class="num_size_hack">{{order.created_at}}</span></p>
                <p>配送日期：<span class="num_size_hack">{{order.delivery_date}}</span></p>
                <p>总 金 额：<span class="num_size_hack">{{order.total_amount}}</span><span>元</span></p>
                <p>订单状态：<span v-if="order.is_paied">已支付</span><span v-if="!order.is_paied">未支付</span></p>
            </div>

            <div class="indent_bottom" v-for="item in order.items">
                <p>{{item.name}}<span class="indent_bottom_right indent_bottom_right_price">&yen;：{{item.price*100*item.quantity/100}}</span></p>
                <p><span>单位：{{item.unit}}</span>
					<span class="indent_bottom_right edit_num_box">
						<div class="min"><img src="../img/jian.gif"/></div>
						<div class="edit_num"><input class="input_number" type="number" v-model="item.quantity" /></div>
						<div class="add"><img src="../img/jia.gif"/></div>	
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
            this.$http.get(API_BASE_URL + '/order/'+this.$route.params.id+'?token='+localStorage.token).then(function (res) {
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