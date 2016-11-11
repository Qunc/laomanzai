var Vue = require('vue')
var VueRouter = require('vue-router')
var VueResource = require('vue-resource');

var Index = require('./Index.vue')
var Indent = require('./Indent.vue')
var Detail = require('./Detail.vue')

//加载css
require('./assets/css/index.css')

//token获取
var getQueryParam = function (paras) {
  var url = location.href;
  url = url.substring(0, url.indexOf('#'));  //舍弃#及以后的数据
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
if (token) {
  localStorage.setItem('token', token);
}


//API 接口地址


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.headers.common['Content-Type'] = 'application/json';


const router = new VueRouter({
  //mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Index },
    {path: '/indent', component: Indent },
    {name:'detail', path: '/detail/:id', component: Detail}
  ]
});


new Vue({
  router: router,
  props: ['order_success']
}).$mount('#app');


