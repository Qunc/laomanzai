<template>
    <div>
        <header class="header_title">
		<!-- 修改成功提示和遮罩层 -->
			<div v-if="edit_success_tips">
	            <div class="OverfullDebt" id="Indent_OverfullDebt">
	                <img src="./assets/img/Order_success.gif"/>
	                <p class="Order_Success_Text">修改成功</p>
	            </div>
	            <div class="shade success-tips" id="Indent_shade"></div>
            </div>
        <!-- 修改成功提示和遮罩层 End-->
            <img src="./assets/img/left.png" v-on:click="detail_back" /><span>订单详情</span>
			
        </header>
        <section style="margin-bottom: 50px;">
        	<div class="Detail_Tips">
        		<div class="Detail_Tips_left">如需新增商品，请执行:</div>
        		<div class="Detail_Tips_right">
        			<ol>
        				<li>回到订购页</li>
        				<li>清零商品数量</li>
        				<li>输入所需要的商品数量,“一键订货”</li>
        			</ol>
        		</div>
        		
        	</div>
            <div class="details">
            	<router-link :to="{path:'/refund/' + order.order_id}">
            		<div class="refund" v-if="!order.can_edit">退 款</div>
            	</router-link>
                <p>订单编号：<span class="num_size_hack">{{order.order_id}}</span></p>
                <p>订货时间：<span class="num_size_hack">{{order.created_at}}</span></p>
                <p>配送日期：<span class="num_size_hack">{{order.delivery_date}}</span></p>
                <p>总 金 额：<span class="num_size_hack">{{total_amount}}</span><span>元</span></p>
                <p>订单状态：<span v-if="order.is_paied">已支付</span><span v-if="!order.is_paied">未支付</span></p>
            </div>

            <div class="indent_bottom" v-for="(item, index) in order.items">
                <p>{{item.name}}<span class="indent_bottom_right indent_bottom_right_price">&yen;：{{item.price*100*item.quantity/100}}</span></p>
                <p> <span>单位：{{item.unit}}</span>
					<span v-if="order.can_edit" class="indent_bottom_right edit_num_box">
						<div id="min" class="min" v-on:click="detail_min(index)"><img src="./assets/img/jian.gif" /></div>
						<div id="edit_num" class="edit_num"><input class="input_number" type="number" v-model="item.quantity" /></div>
						<div id="add" class="add" v-on:click="detail_add(index)"><img src="./assets/img/jia.gif" /></div>	
					</span>
					
						
						
					<span v-if="!order.can_edit" class="indent_bottom_right indent_bottom_right_price" style="top:4.8rem;">×{{item.quantity}}</span>
						
						
					
                </p>
                <div class="border_bottom"></div>
            </div>
           

        </section>
        <footer v-if="order.can_edit">
			<div class="bottom_edit_confirm_box" v-on:click="submit_edit">
				<div class="bottom_edit_confirm" id="bottom_edit_confirm"><p>确认修改</p></div>
			</div>
        </footer>
    </div>
</template>

<script>
module.exports = {
    data: function () {
        return {
            order: {},
            edit_success_tips: false
        }
    },
    created: function () {
        this.fetchData();
    },
    computed: {
    	total_amount: function () {
    		var total = 0;
    		if (!this.order.items) {
    			return 0;
    		}
	    	for (var i = 0; i < this.order.items.length; i++) {
	    		var item = this.order.items[i];
	    		var sing = item.price*100*item.quantity/100;
	    		total = (total*100 + sing*100)/100; 
	    	}
	    	return total;
    	}
    },
    methods: {
        fetchData: function (){
            this.$http.get(API_BASE_URL + '/order/'+this.$route.params.id+'?token='+ localStorage.token).then(function (res) {
                if (res.body.err_code == 0) {
                    this.order = res.body;
                }
            }, function (res) {});
        },
        detail_back: function(){
        	window.history.go(-1);
        },
        detail_min: function(index){
        	var q = parseInt(this.order.items[index].quantity);
        	this.order.items[index].quantity = q > 0 ? q - 1 : 0;
        },
        detail_add: function(index){
        	this.order.items[index].quantity = parseInt(this.order.items[index].quantity) + 1;
        },
        submit_edit: function () {
        	var edit_items = [];
        	for (var i = 0; i < this.order.items.length; i++) {
        		var item = this.order.items[i];
	    		edit_items.push({product_id: item.product_id, quantity: item.quantity});
	    	}
        	
        	//submit
        	this.$http.put(API_BASE_URL + '/order/' + this.order.order_id + '?token=' + localStorage.token, {edit_items: edit_items})
        	.then(function (res) {
        		if (res.body.err_code != 0) {
        			alert(res.body.err_msg);
        		} else {
        			this.edit_success_tips = true;
        			var self = this;
        			setTimeout(function () {
        				self.edit_success_tips = false;
        			}, 3000)
        		}
        	})
        	
        }
    }
}
</script>