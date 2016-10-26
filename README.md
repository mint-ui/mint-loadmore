# Overview
vue-loadmore is a two-direction mobile pull-to-refresh component for vue.js.

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

```html
<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
  <ul>
    <li v-for="item in list">{{ item }}</li>
  </ul>
</mt-loadmore>
```

Take upward direction for example: pull the component `topDistance` pixels away from the top and then release it, the function you appointed as `top-method` will run

```javascript
loadTop(id) {
  ...// load more data
  this.$refs.loadmore.onTopLoaded(id);
}
```
At the end of your `top-method`, don't forget to manually execute the `onTopLoaded` event so that `mint-loadmore` removes `topLoadingText`. Note that a parameter called `id` is passed to `loadTop` and `onTopLoaded`. This is because after the top data is loaded, some reposition work is performed inside a `mint-loadmore` instance, and `id` simply tells the component which instance should be repositioned. You don't need to do anything more than passing `id` to `onTopLoaded` just as shown above.

For downward direction, things are similar. To invoke `bottom-method`, just pull the component `bottomDistance` pixels away from the bottom and then release it

```javascript
loadBottom(id) {
  ...// load more data
  this.allLoaded = true;// if all data are loaded
  this.$refs.loadmore.onBottomLoaded(id);
}
```
The only difference is that after all data are fetched, you can set `bottom-all-loaded` to `true` so that `bottom-method` will not run any more.

The ratio between the distance that your finger moves and the distance that the component actually scrolls can be defined using `distance-index`, whose default value is 2。

## Custom HTML templates

You can customize the top and bottom DOM using an HTML template
```html
<mt-loadmore :top-method="loadTop" :top-status.sync="topStatus">
  <ul>
    <li v-for="item in list">{{ item }}</li>
  </ul>
  <div slot="top" class="mint-loadmore-top">
    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
    <span v-show="topStatus === 'loading'">Loading...</span>
  </div>
</mt-loadmore>
```
For example, to customize the top DOM, you'll need to write your template with a `slot` attribute set to `top` and `class` set to `mint-loadmore-top`. When the component is scrolled, it will be in one of the three status below
*  `pull`: if the component is being pulled yet not ready to drop (top distance is within the distance threshold defined by `topDistance`)
*  `drop`: if the component is ready to drop
*  `loading`: if `topMethod` is running
Every time the status changes, an event named `top-status-change` fires with a parameter indicating the current status of the component. So you can handle this change with a `handleTopChange` method just as the above example shows.

## Configure texts in top and bottom DOM
If you decide not to customize HTML templates, you can configure the texts that comes with `loadmore`. Take the top DOM for example, corresponding to the three `top-status` states, configurable options are: `topPullText`, `topDropText` and `topLoadingText`. And `bottomPullText`, `bottomDropText` and `bottomLoadingText` are for the bottom DOM.

## Auto fill
Upon loaded, `loadmore` will automatically check if it is tall enough to fill its container. If not, `bottom-method` will run until its container is filled. Turn off `auto-fill` if you'd rather handle this manually.

## API
| option | description | type | acceptable values | default |
|------|-------|---------|-------|--------|
| autoFill | if `true`, `loadmore` will check and fill its container | Boolean | | true |
| distanceIndex | the ratio between the distance of the finger moves and the component scrolls | Number | | 2 |
| maxDistance | maximum distance(in pixel) the component can scroll. Can be disabled by setting it to 0 | Number | | 0 |
| topPullText | top text when the component is being pulled down | String | | '下拉刷新' |
| topDropText | top text when the component is ready to drop | String | | '释放更新' |
| topLoadingText | top text while `topMethod` is running | String | | '加载中...' |
| topDistance | distance threshold that triggers `topMethod`(in pixel) | Number | | 70 |
| topMethod | upward load-more function | Function | | |
| bottomPullText | bottom text when the component is being pulled up | String | | '上拉刷新' |
| bottomDropText | bottom text when the component is ready to drop | String | | '释放更新' |
| bottomLoadingText | bottom text while `bottomMethod` is running | String | | '加载中...' |
| bottomDistance | distance threshold that triggers `bottomMethod`(in pixel) | Number | | 70 |
| bottomMethod | downward load-more function | Function | | |
| bottomAllLoaded | if `true`, `bottomMethod` can no longer be triggered | Boolean | | false |

## Events
| event name | description | parameters |
|------|-------|---------|
| top-status-change | the callback when the component's top status changes | current top status |
| bottom-status-change | the callback when the component's bottom status changes | current bottom status |

## Slot
| name | description |
|------|--------|
| - | data list |
| top | custom top HTML template |
| bottom | custom bottom HTML template |

# License
MIT
