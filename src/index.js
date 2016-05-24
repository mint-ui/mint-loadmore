import Vue from 'vue';
import Loadmore from './loadmore.vue';
import FadingCircle from 'kb-spinner/lib/fading-circle';
import 'kb-spinner/lib/fading-circle/style.css';
Vue.component('spinner', FadingCircle);
export default Loadmore;
