<template>
  <div class="loadmore">
    <div class="loadmore-top" :class="{ 'dropped': topDropped }" :style="{ 'height': topDomHeight }">{{ topText }}</div>
    <slot></slot>
    <div class="loadmore-bottom" v-if="loadingBottom">{{ bottomLoadingText }}</div>
  </div>
</template>

<style>
  .loadmore-top {
    position: relative;
    text-align: center;
    overflow: hidden;
    line-height: 50px;
    transform: translateZ(0);
  }

  .loadmore-top.dropped {
    transition: .2s;
  }

  .loadmore-bottom {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
</style>

<script type="text/babel">
  export default {
    props: {
      topPullText: {
        type: String,
        default: '下拉刷新'
      },
      topDropText: {
        type: String,
        default: '释放更新'
      },
      topLoadingText: {
        type: String,
        default: '加载中...'
      },
      topDistance: {
        type: Number,
        default: 70
      },
      topMethod: {
        type: Function
      },
      bottomLoadingText: {
        style: String,
        default: '加载中...'
      },
      bottomDistance: {
        type: Number,
        default: 70
      },
      bottomMethod: {
        type: Function
      },
      bottomAllLoaded: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        text: '',
        text2: '',
        scrollEventTarget: null,
        containerFilled: false,
        loadingTop: false,
        topText: '',
        topDomHeight: '0',
        topReady: false,
        topDropped: false,
        loadingBottom: false,
        direction: '',
        startY: 0,
        startScrollTop: 0,
        currentY: 0
      };
    },

    events: {
      onTopLoaded() {
        this.loadingTop = false;
        this.topDomHeight = '0';
      },

      onBottomLoaded() {
        this.loadingBottom = false;
        if (!this.bottomAllLoaded && !this.containerFilled) {
          this.fillContainer();
        }
      }
    },

    methods: {
      getScrollEventTarget(element) {
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
          }
          currentNode = currentNode.parentNode;
        }
        return window;
      },

      getScrollTop(element) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        } else {
          return element.scrollTop;
        }
      },

      init() {
        this.topDomHeight = '0';
        this.topText = this.topPullText;
        this.scrollEventTarget = this.getScrollEventTarget(this.$el);
        if (typeof this.bottomMethod === 'function') {
          this.scrollEventTarget.addEventListener('scroll', this.handleScroll);
          this.fillContainer();
        }
        if (typeof this.topMethod === 'function') {
          this.$el.addEventListener('touchstart', this.handleTouchStart);
          this.$el.addEventListener('touchmove', this.handleTouchMove);
          this.$el.addEventListener('touchend', this.handleTouchEnd);
        }
      },

      fillContainer() {
        this.$nextTick(() => {
          if (this.scrollEventTarget === window) {
            this.containerFilled = this.$el.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom;
          } else {
            this.containerFilled = this.$el.getBoundingClientRect().bottom >= this.scrollEventTarget.getBoundingClientRect().bottom;
          }
          if (!this.containerFilled) {
            this.loadingBottom = true;
            this.bottomMethod();
          }
        });
      },

      handleScroll() {
        if (typeof this.bottomMethod === 'function' && !this.loadingBottom && !this.bottomAllLoaded) {
          let viewedHeight;
          if (this.scrollEventTarget === window) {
            viewedHeight = document.documentElement.clientHeight - this.$el.getBoundingClientRect().top;
          } else {
            viewedHeight = this.scrollEventTarget.scrollTop + this.scrollEventTarget.clientHeight;
          }
          if (viewedHeight + this.bottomDistance >= this.$el.getBoundingClientRect().height) {
            this.loadingBottom = true;
            this.bottomMethod();
          }
        }
      },

      handleTouchStart(event) {
        if (!this.loadingTop) {
          this.topDropped = false;
          this.topText = this.topPullText;
          this.startY = event.touches[0].pageY;
          this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
        }
      },

      handleTouchMove(event) {
        if (this.startY < this.$el.getBoundingClientRect().top) {
          return;
        }
        this.currentY = event.touches[0].pageY;
        let distance = this.currentY - this.startY - this.startScrollTop;
        this.direction = this.currentY - this.startY > 0 ? 'down' : 'up';
        if (typeof this.topMethod === 'function' && this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && !this.loadingTop) {
          event.preventDefault();
          event.stopPropagation();
          this.topDomHeight = distance + 'px';
          if (distance >= this.topDistance) {
            this.topText = this.topDropText;
            this.topReady = true;
          } else {
            this.topText = this.topPullText;
            this.topReady = false;
          }
        }
      },

      handleTouchEnd() {
        this.topDropped = true;
        this.direction = '';
        if (this.topReady) {
          this.topDomHeight = '50px';
          this.topText = this.topLoadingText;
          this.loadingTop = true;
          this.topReady = false;
          this.topMethod();
        } else {
          this.topDomHeight = '0';
          this.topText = this.topPullText;
        }
      }
    },

    ready() {
      this.init();
    }
  };
</script>