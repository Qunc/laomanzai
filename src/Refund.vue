<template>
	
    <div>
       	<header class="header_title">
			<!-- 修改成功提示和遮罩层 -->
			<div v-show="edit_success_tips">
	            <div class="OverfullDebt" id="Indent_OverfullDebt">
	                <img src="./assets/img/Order_success.gif"/>
	                <p class="Order_Success_Text" id="refund_tiptext">退款成功</p>
	            </div>
	            <div class="shade success-tips" id="Indent_shade"></div>
            </div>
        	<!-- 修改成功提示和遮罩层 End-->
			<img src="./assets/img/left.png" v-on:click="refund_back"/><span>退款</span><!--<span class="span_right">确定</span>-->
		</header>

        <section>
            <div class="Refund_Indent">
            	<p>订单编号：<span>{{$route.params.id}}</span></p>
            	<p>订货时间：<span>{{order.created_at}}</span></p>
            	<p>总 金 额：<span>{{order.total_amount}}</span>元</p>
            </div>
            <div class="Refund_Detail">
            	<div class="money">退款金额：<input type="number" placeholder="请输入您的退款金额" v-model.number="RefundMoney"/></div>
            	<div class="line_between"></div>
            	<br />
            	<div class="reason"><textarea type="text" placeholder="请输入您的退款原因" v-model="reason"/></div>
            </div>
        </section>
        <footer>
        	<div class="bottom_edit_confirm_box" v-on:click="submit_edit">
				<div class="bottom_edit_confirm" id="bottom_edit_confirm"><p>确认退款</p></div>
			</div>
            <!-- 以下是底部导航 -->
            
        </footer>
    </div>
</template>
<script>
module.exports = {
	data:function (){
			return {
				order: [],
				RefundMoney:'',
				reason:'',
				edit_success_tips: false
			} 
        },
	created:function (){
		this.fetchData();
	},
	methods:{
		fetchData: function (){
            this.$http.get(API_BASE_URL + '/order/'+this.$route.params.id+'?token='+ localStorage.token).then(function (res) {
                if (res.body.err_code == 0) {
                    this.order = res.body;
//                  console.log(this.order.total_amount);
                }
            }, function (res) {});
        },
		refund_back: function(){
        	window.history.go(-1);
        },
        submit_edit: function () {
			this.$http.post(API_BASE_URL + '/refund' + '?token=' + localStorage.token,{order_id:this.$route.params.id, refund_amount:this.RefundMoney,reason:this.reason})
			.then(function (res) {
				if (res.body.err_code == 4003) {
        			//alert(res.body.err_msg);
        			document.getElementById('refund_tiptext').innerHTML = '退款金额不能大于订单总金额！';
        			document.getElementById('refund_tiptext').style.left = '24%';
        			this.edit_success_tips = true;
        			var self = this;
        			setTimeout(function () {
        				self.edit_success_tips = false;
        			}, 3000)
        		}else if(res.body.err_code == 4002){
        			document.getElementById('refund_tiptext').innerHTML = '退款金额不能为空！';
        			document.getElementById('refund_tiptext').style.left = '38%';
        			this.edit_success_tips = true;
        			var self = this;
        			setTimeout(function () {
        				self.edit_success_tips = false;
        			}, 3000)
        		}else if(res.body.err_code == 4001){
        			document.getElementById('refund_tiptext').innerHTML = '重复退款';
        			document.getElementById('refund_tiptext').style.left = '50%';
        			this.edit_success_tips = true;
        			var self = this;
        			setTimeout(function () {
        				self.edit_success_tips = false;
        			}, 3000)
        		}else if(res.body.err_code == 0) {
        			document.getElementById('refund_tiptext').innerHTML = '退款成功';
        			document.getElementById('refund_tiptext').style.left = '50%';
        			this.edit_success_tips = true;
        			var self = this;
        			setTimeout(function () {
        				self.edit_success_tips = false;
        			}, 3000)
        		}else{
        			document.getElementById('refund_tiptext').innerHTML = '退款失败';
        			document.getElementById('refund_tiptext').style.left = '50%';
        			this.edit_success_tips = true;
        			var self = this;
        			setTimeout(function () {
        				self.edit_success_tips = false;
        			}, 3000)
        		}
			})
//			console.log(this.RefundMoney);
//			console.log(this.reason);
        }
	}
}
</script>


