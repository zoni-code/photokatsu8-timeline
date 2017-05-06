<template v-if="screenName !== undefined || tweetId !== undefined">
    <div class="tweet">
      <lazy-component @show="handler">
        <slot></slot>
        <blockquote :class="tweetClass" data-lang="en">
          <a :href="'https://twitter.com/' + screenName + '/status/' + tweetId">
            <div class="loader">Loading...</div>
          </a>
        </blockquote>
      </lazy-component>
    </div>
</template>

<script>
export default {
  name: 'tweet',
  props: ['screenName', 'tweetId'],
  data () {
    return {
      tweetClass: undefined
    }
  },
  methods: {
    handler (component) {
      this.tweetClass = 'twitter-tweet'
      setTimeout(() => {
        window.twttr.widgets.load()
      }, 0)
    }
  }
}
</script>

<style>
.tweet {
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  position: absolute;
  z-index: 1;
}

.tweet a {
  color: #333;
}

.tweet:hover {
  z-index: 2;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0,0,0, 0.2);
  border-right: 1.1em solid rgba(0,0,0, 0.2);
  border-bottom: 1.1em solid rgba(0,0,0, 0.2);
  border-left: 1.1em solid #000000;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
