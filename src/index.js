import Vue from 'vue';
import Loadmore from './loadmore.vue';
import FadingCircle from 'mint-spinner/lib/fading-circle';
import 'mint-spinner/lib/fading-circle/style.css';
Vue.component('spinner', FadingCircle);
export default Loadmore;
