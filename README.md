# Overview
vue-loadmore is a two-direction mobile load-more plugin for vue.js.

# Installation
```bash
$ npm install vue-loadmore
```

# Usage
Import `vue-loadmore` to your project:
```Javascript
// ES6 mudule
import Loadmore from 'vue-loadmore';

// CommonJS
const Loadmore = require('vue-loadmore').default;
```

Register component:
```Javascript
Vue.component('loadmore', Loadmore);
```

Then use it:
```html
<loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
  ...
</loadmore>
```

# Example
Visit [this page](http://leopoldthecoder.github.io/Demos/vue-loadmore/index.html) using your mobile device.
```html
<loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
  <ul>
    <li v-for="item in list">{{ item }}</li>
  </ul>
</loadmore>
```
For upward direction, `vue-loadmore` uses pull-to-refresh to load more. Pull the component `topDistance` pixels away from the top and then release it, the function you appointed as `top-method` will run:
 ```Javascript
 loadTop() {
   ...// load more data
   this.$broadcast('onTopLoaded');
 }
 ```
At the end of your `top-method`, don't forget to broadcast the `onTopLoaded` event so that `vue-loadmore` removes `topLoadingText`.
 
For downward direction, `bottom-method` will run when the bottom of the component is less than `bottomDistance` pixels away from the bottom of its container:
```Javascript
  loadBottom() {
    ...// load more data
    this.allLoaded = true;// if all data are loaded
    this.$broadcast('onBottomLoaded');
  }
```
Remember to set `bottom-all-loaded` to `true` after all data are loaded. And of course broadcast `onBottomLoaded`.

If you don't need to load data from upward direction, simply omit the `topMethod` attribute. Same goes to downward.

# API
| Option            | Description                                                     | Value    | Default     |
|-------------------|-----------------------------------------------------------------|----------|-------------|
| topPullText       | top text when the component is being pulled down                | String   | '下拉刷新'  |
| topDropText       | top text when the component is ready to drop                    | String   | '释放更新'  | 
| topLoadingText    | top text while `topMethod` is running                           | String   | '加载中...' |
| topDistance       | distance threshold that triggers `topMethod`                    | Number   | 70          |
| topMethod         | upward load-more function                                       | Function |             |
| bottomLoadingText | bottom text while `bottomMethod` is running                     | String   | '加载中...' |
| bottomDistance    | distance threshold that triggers `bottomMethod`                 | Number   | 70          |
| bottomMethod      | downward load-more function                                     | Function |             |
| bottomAllLoaded   | if `true`, `bottomMethod` can no longer be triggered            | Boolean  | false       |

# License
MIT
