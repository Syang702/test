(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-number-box/u-number-box"],{"26f0":function(t,n,e){"use strict";var i=e("d60f"),u=e.n(i);u.a},2814:function(t,n,e){"use strict";var i={uIcon:function(){return e.e("uview-ui/components/u-icon/u-icon").then(e.bind(null,"abc1"))}},u=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}))},"6cfd":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"u-number-box",props:{value:{type:Number,default:1},bgColor:{type:String,default:"#F2F3F5"},min:{type:Number,default:0},max:{type:Number,default:99999},step:{type:Number,default:1},disabled:{type:Boolean,default:!1},size:{type:[Number,String],default:26},color:{type:String,default:"#323233"},inputWidth:{type:[Number,String],default:80},inputHeight:{type:[Number,String],default:50},index:{type:[Number,String],default:""},disabledInput:{type:Boolean,default:!1},cursorSpacing:{type:[Number,String],default:100},longPress:{type:Boolean,default:!0},pressTime:{type:[Number,String],default:250}},watch:{value:function(t,n){Number(t)!=this.inputVal&&(this.inputVal=Number(t))},inputVal:function(t,n){var e=this;if(""!=t){var i=0,u=this.$u.test.number(t);i=u&&t>=this.min&&t<=this.max?t:n,this.handleChange(i,"change"),this.$nextTick((function(){e.inputVal=t}))}}},data:function(){return{inputVal:1,timer:null}},created:function(){this.inputVal=Number(this.value)},computed:{getCursorSpacing:function(){return Number(t.upx2px(this.cursorSpacing))}},methods:{btnTouchStart:function(t){var n=this;this[t](),this.longPress&&(clearInterval(this.timer),this.timer=null,this.timer=setInterval((function(){n[t]()}),this.pressTime))},clearTimer:function(){var t=this;this.$nextTick((function(){clearInterval(t.timer),t.timer=null}))},minus:function(){this.computeVal("minus")},plus:function(){this.computeVal("plus")},calcPlus:function(t,n){var e,i,u;try{i=t.toString().split(".")[1].length}catch(r){i=0}try{u=n.toString().split(".")[1].length}catch(r){u=0}e=Math.pow(10,Math.max(i,u));var a=i>=u?i:u;return((t*e+n*e)/e).toFixed(a)},calcMinus:function(t,n){var e,i,u;try{i=t.toString().split(".")[1].length}catch(r){i=0}try{u=n.toString().split(".")[1].length}catch(r){u=0}e=Math.pow(10,Math.max(i,u));var a=i>=u?i:u;return((t*e-n*e)/e).toFixed(a)},computeVal:function(n){if(t.hideKeyboard(),!this.disabled){var e=0;"minus"===n?e=this.calcMinus(this.inputVal,this.step):"plus"===n&&(e=this.calcPlus(this.inputVal,this.step)),e<this.min||e>this.max||(this.inputVal=e,this.handleChange(e,n))}},onBlur:function(t){var n=this,e=0,i=t.detail.value;/(^\d+$)/.test(i)&&0!=i[0]||(e=this.min),e=+i,e>this.max?e=this.max:e<this.min&&(e=this.min),this.$nextTick((function(){n.inputVal=e})),this.handleChange(e,"blur")},handleChange:function(t,n){this.disabled||(this.$emit("input",Number(t)),this.$emit(n,{value:Number(t),index:this.index}))}}};n.default=e}).call(this,e("543d")["default"])},"839e":function(t,n,e){"use strict";e.r(n);var i=e("2814"),u=e("ec70");for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);e("26f0");var r,l=e("f0c5"),s=Object(l["a"])(u["default"],i["b"],i["c"],!1,null,"605dcdb9",null,!1,i["a"],r);n["default"]=s.exports},d60f:function(t,n,e){},ec70:function(t,n,e){"use strict";e.r(n);var i=e("6cfd"),u=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-number-box/u-number-box-create-component',
    {
        'uview-ui/components/u-number-box/u-number-box-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("839e"))
        })
    },
    [['uview-ui/components/u-number-box/u-number-box-create-component']]
]);
