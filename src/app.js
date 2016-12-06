
var Vue = require('vue')
var VueRouter = require('vue-router')
var VueResource = require('vue-resource');

var Index = require('./Index.vue')
var Indent = require('./Indent.vue')
var Detail = require('./Detail.vue')
var Refund = require('./Refund.vue')
//先设置一个token
localStorage.setItem('token','a153007bb05bb2fb3eb3fcd0e2e64acc');
//如果url有token，就从url获取token
var getQueryParam = function (paras) {
    var url = location.href;
    url = url.indexOf('#') == -1 ? url: url.substring(0, url.indexOf('#'));  //舍弃#及以后的数据
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&"); //得到?号后面的数据
    //paraString里放的是token=abcde
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    //returnValue里放的是"token="后面的东西abcde
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

var token = getQueryParam('token');
if (!token) {
    token = localStorage.getItem('token');
} else {
    localStorage.setItem('token', token);
}

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.headers.common['Content-Type'] = 'application/json';


const router = new VueRouter({
    //mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', component: Index },
        {path: '/indent', component: Indent },
        {name:'detail', path: '/detail/:id', component: Detail},
        {name:'refund', path: '/refund/:id', component: Refund}
    ]
});


new Vue({
    router: router,
    props: ['order_success']
}).$mount('#app');
