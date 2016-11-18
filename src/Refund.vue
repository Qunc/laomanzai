<template>
	
    <div>
       	<header class="header_title">
			<img src="./assets/img/left.png" v-on:click="refund_back"/><span>退款</span><span class="span_right">确定</span>
		</header>

        <section>
            <div class="Refund_Indent">
            	<p>订单编号：<span>094400036382519</span></p>
            	<p>订货时间：<span>2016-10-23 18:46:02</span></p>
            </div>
            <div class="Refund_Detail">
            	<div class="money">退款金额：<input type="number" placeholder="请输入您的退款金额" /></div>
            	<div class="reason"><input type="text" placeholder="请输入您的退款原因" /></div>
            </div>
        </section>
        <footer>
            <!-- 以下是底部导航 -->
            
        </footer>
    </div>
</template>
<script>
module.exports = {
	methods:{
		refund_back: function(){
        	window.history.go(-1);
        }
	}
}
</script>
