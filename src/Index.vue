<template>
    <div>
        <header>
            <!-- 以下是超额提示和遮罩层 -->
            <div v-if="exceed" class="OverfullDebt" id="Index_OverfullDebt">
                <div class="OverfullDebt_top">
                    <p>温馨提示</p>
                </div>
                <div class="OverfullDebt_middle">
                    <p class="p1">您的累计欠款已超额,</p>
                    <p class="p2">支付后才能完成本次订货哦!</p>
                </div>
                <div class="OverfullDebt_bottom">
                    <p><router-link to="/indent">去支付</router-link></p>
                </div>
            </div>
            <div v-if="exceed" class="shade" id="Index_shade"></div>
        </header>

        <section style="margin-bottom: 95px;">
            <div class="products" v-for="(item, index) in product_list">
                <div class="products_left">
                    <img :src="item.main_img"/>
                </div>
                <div class="products_right">
                    <p>{{item.name}}</p>
                    <p class="price">&yen;{{item.price}}</p>
                    <div v-show="!parseInt(item.last_buy_quantity) && !item.edit" class="order_button">
                        <button v-on:click="edit_item(index)">点击订货</button>
                    </div>
                    <div v-show="parseInt(item.last_buy_quantity) || item.edit" class="order_num">
                        <span>订货量：<input v-model="item.last_buy_quantity" v-on:focus="edit_item(index)" v-on:blur="item.edit=false"/></span>
                        <span>{{item.unit}}</span>
                    </div>
                </div>
            </div>

            <!-- 以下是一键订货 -->
            <div class="footer_accounts">
                <span class="total">合计：</span>
                <i> &yen</i>
                <span class="accounts_price">{{total_cost || 0}}</span>
            </div>
            <button v-show="total_cost" class="accounts" v-on:click="submit_order">一键订货</button>
            <button v-show="!total_cost" disabled="disabled" class="accounts" id="OneKeyOrder">一键订货</button>
            <!-- 一键订货End -->
        </section>
        <footer>

            <!-- 以下是底部导航 -->
            <div class="index_bottom">
                <div class="index_bottom_left">
                    <dl>
                        <dt>
                            <img src="./assets/img/cart_active.gif"/>
                        </dt>
                        <dd><p style="color:#52BE44;">订购</p></dd>
                    </dl>
                </div>
                <div class="cut-off"></div>
                <div class="index_bottom_right">
                    <dl>
                    	<router-link to="/indent">
	                        <dt>
	                            <img src="./assets/img/bill.gif"/>
	                        </dt>
	                        <dd><p>账单</p></dd>
                    	</router-link>
                    </dl>
                </div>
            </div>
            <!-- 底部导航End -->
        </footer>
    </div>
</template>

<script>
module.exports = {
    data: function () {
        return {
            loading: true,
            product_list: [],
            exceed: false //超额
        }
    },
    created: function () {
        this.fetchData();
        this.exceed = false;
    },
    computed: {
        //合计金额
        total_cost: function () {
            var cost = 0;
            for (i in this.product_list) {
                var item = this.product_list[i];
                if (item.last_buy_quantity) {
                	var single = (item.last_buy_quantity * item.price * 100 )/100;
                    cost =  (cost * 100 + single *100 )/100;
                }
            }
            return cost;
        }
    },
    methods: {
        fetchData: function () {
            this.$http.get(localStorage.getItem('base_url') + '/factory/products?token='+localStorage.token).then(function (res) {
                if (res.body.err_code == 0) {
                    var list = res.body.product_list;
                    for (var i=0; i < list.length; i++) {
                        list[i].edit = false;
                    }
                    this.product_list = list;
                }
            }, function (res) {});
        },
        edit_item: function (index) {
            this.product_list[index].edit = true;
            if (!this.product_list[index].last_buy_quantity) {
                //this.product_list[index].last_buy_quantity = '';
            }
        },
        submit_order: function () {
            var buy_items = [];
            for (i in this.product_list) {
                var item = this.product_list[i];
                if (item.last_buy_quantity) {
                    //cost += item.last_buy_quantity * item.price;
                    buy_items.push({
                        product_id: item.product_id,
                        quantity: item.last_buy_quantity
                    });
                }
            }

            this.$http.post(localStorage.getItem('base_url') + '/order?token=' +localStorage.token, {buy_items: buy_items}).then(function (res) {
                if (res.body.err_code == 2001) {
                    this.exceed = true;
                } else {
                    this.$router.push('/indent/1')
                }
            })
        }
    }
}
</script>
