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
    loadTop() {
      setTimeout(() => {
        if (this.list[0] === 1) {
          for (let i = 0; i >= -10; i--) {
            this.list.unshift(i);
          }
        }
        this.$broadcast('onTopLoaded');
      }, 1500);
    },

    loadBottom() {
      setTimeout(() => {
        let lastValue = this.list[this.list.length - 1];
        if (lastValue < 40) {
          for (let i = 1; i <= 10; i++) {
            this.list.push(lastValue + i);
          }
        } else {
          this.allLoaded = true;
        }
        this.$broadcast('onBottomLoaded');
      }, 1500);
    }
  },

  compiled() {
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
      allLoaded2: false
    };
  },

  methods: {
    loadTop2() {
      setTimeout(() => {
        if (this.list2[0] === 1) {
          for (let i = 0; i >= -10; i--) {
            this.list2.unshift(i);
          }
        }
        this.$broadcast('onTopLoaded');
      }, 1500);
    },

    loadBottom2() {
      setTimeout(() => {
        let lastValue = this.list2[this.list2.length - 1];
        if (lastValue < 40) {
          for (let i = 1; i <= 10; i++) {
            this.list2.push(lastValue + i);
          }
        } else {
          this.allLoaded2 = true;
        }
        this.$broadcast('onBottomLoaded');
      }, 1500);
    }
  },

  compiled() {
    for (let i = 1; i <= 20; i++) {
      this.list2.push(i);
    }
  }
});
