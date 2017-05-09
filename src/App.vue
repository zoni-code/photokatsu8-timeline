<template>
  <div>
    <lanes id="app" :pixelPerHour="pixelPerHour">
      <header-lane>
        <time-label v-for="timeLabel in timeLabels" :key="timeLabel.label" :height="pixelPerHour" :type="timeLabel.type">{{ timeLabel.label }}</time-label>
      </header-lane>
      <container-lane v-for="lane in tweetLane" :key="lane.name" :name="lane.screenName" :ref="lane.screenName">
        <template v-for="tweet in lane.tweets" >
          <arrow
            :data-from="lane.screenName"
            :key="tweet.id"
            v-for="(arrow, index) in arrows['arrow-' + tweet.tweetId]" 
            v-bind:style="{ top: tweet.positon + (15 * index) + 20 + 'px', width: arrow.width + 'px', transform: arrow.toLeft === true ? 'translateX(-100%) rotate(180deg)' : 'translateX(0%)' }">
          </arrow>
        </template>
        <template v-for="tweet in lane.tweets" >
          <tweet 
            :key="tweet.id" 
            :screenName="lane.screenName" 
            :tweetId="tweet.tweetId"
            v-bind:style="{ top: tweet.positon + 'px'}"
          />
        </template>
      </container-lane>
    </lanes>
  </div>
</template>

<script>
import Lanes from './components/Lanes'
import HeaderLane from './components/HeaderLane'
import ContainerLane from './components/ContainerLane'
import Tweet from './components/Tweet'
import TimeLabel from './components/TimeLabel'
import Arrow from './components/Arrow'
import LanesDataRepository from './repository/LanesDataRepository'

const laneDataRepository = new LanesDataRepository()

export default {
  name: 'app',
  components: {
    Lanes,
    HeaderLane,
    ContainerLane,
    Tweet,
    TimeLabel,
    Arrow
  },
  data () {
    return {
      lanes: laneDataRepository.getInitialData(),
      arrows: null,
      timeline: {
        endTimestamp: dayEndTime(new Date(2017, 4, 9, 0, 0, 0)).getTime(),
        startTimestamp: dayStartTime(new Date(2017, 3, 25, 0, 0, 0)).getTime(),
        secondsPerPixel: 10
      }
    }
  },
  computed: {
    tweetLane: function () {
      const tweetLane = this.lanes.map((lane) => {
        lane.tweets = lane.tweets.map((tweet) => {
          tweet.positon = (this.timeline.endTimestamp - tweet.timestamp) / 1000 / this.timeline.secondsPerPixel
          return tweet
        })
        return lane
      })
      return tweetLane
    },
    timeLabels: function () {
      let startTime = this.timeline.startTimestamp
      const endTime = this.timeline.endTimestamp

      const hours = []
      while (startTime < endTime) {
        hours.push(new Date(startTime))
        startTime += 60 * 60 * 1000
      }

      return hours.reverse().map((hour, index) => {
        return {
          label: `${hour.getMonth() + 1}/${hour.getDate()} ${hour.getHours()}:00`,
          position: index * this.pixelPerHour,
          type: hour.getHours() < 12 ? 'am' : 'pm'
        }
      })
    },
    pixelPerHour: function () {
      return 60 * 60 / this.timeline.secondsPerPixel
    }
  },
  mounted () {
    laneDataRepository.init().then(() => {
      this.lanes = laneDataRepository.get()
      const tweetLane = this.lanes
      const newArrows = {}
      tweetLane.map((lane) => {
        lane.tweets.map((tweet) => {
          if (tweet.to) {
            const domFrom = this.$refs[lane.screenName][0]
            const domTo = tweet.to.map((screenName) => {
              if (!this.$refs[screenName]) {
                return
              }
              return this.$refs[screenName][0]
            }).filter((dom) => { return !!dom })
            newArrows['arrow-' + tweet.tweetId] = domTo.map((dom) => {
              const distance = domFrom.$el.getBoundingClientRect().left - dom.$el.getBoundingClientRect().left
              return {
                width: Math.abs(distance) - 125,
                toLeft: distance > 0
              }
            })
          }
        })
      })
      this.arrows = newArrows
    })
  }
}

function dayStartTime (date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
}

function dayEndTime (date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
}

</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  font-size: 12px;
}

.tools {
  width: 200px;
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5;
  color: white;
  padding: 10px;
}

.tool-heading {
  font-size: 11px;
  margin: 0;
}

</style>
