import Loadmore from '../src';
new Vue({
  el: '#example1',
  components: {
    'loadmore': Loadmore
  },

  data() {
    return {
      list: [],
      allLoaded: false
    };
  },

  methods: {
    loadTop(id) {
      setTimeout(() => {
        if (this.list[0] === 1) {
          for (let i = 0; i >= -10; i--) {
            this.list.unshift(i);
          }
        }
        this.$refs.top.onTopLoaded(id);
      }, 1500);
    },

    loadBottom(id) {
      setTimeout(() => {
        let lastValue = this.list[this.list.length - 1];
        if (lastValue < 40) {
          for (let i = 1; i <= 10; i++) {
            this.list.push(lastValue + i);
          }
        } else {
          this.allLoaded = true;
        }
        this.$broadcast('onBottomLoaded', id);
      }, 1500);
    }
  },

  created() {
    for (let i = 1; i <= 20; i++) {
      this.list.push(i);
    }
  }
});

new Vue({
  el: '#example2',
  components: {
    'loadmore': Loadmore
  },

  data() {
    return {
      list2: [],
      topStatus: ''
    };
  },

  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },

    loadTop2(id) {
      setTimeout(() => {
        if (this.list2[0] === 1) {
          for (let i = 0; i >= -10; i--) {
            this.list2.unshift(i);
          }
        }
        this.$refs.bottom.onTopLoaded(id);
      }, 1500);
    }
  },

  created() {
    for (let i = 1; i <= 20; i++) {
      this.list2.push(i);
    }
  }
});
