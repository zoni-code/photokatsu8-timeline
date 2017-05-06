import request from 'superagent'

export default class LanesDataRepository {

  tweets;

  init () {
    return request('GET', './static/tweets.json').then((data) => {
      this.tweets = data.body
      return
    })
  }

  get () {
    const tweetForEachUser = {}
    this.tweets.forEach((tweet) => {
      if (!tweetForEachUser[tweet.screenName]) {
        tweetForEachUser[tweet.screenName] = []
      }
      tweetForEachUser[tweet.screenName].push(tweet)
    })

    const result = []
    for (let screenName in tweetForEachUser) {
      result.push({
        screenName: screenName,
        tweets: tweetForEachUser[screenName]
      })
    }
    return result
  }

  getInitialData () {
    return [
      {
        screenName: 'ichigo_ph8',
        tweets: []
      },
      {
        screenName: 'aoi_ph8',
        tweets: []
      },
      {
        screenName: 'ran_ph8',
        tweets: []
      },
      {
        screenName: 'mizuki_ph8',
        tweets: []
      },
      {
        screenName: 'yurika_ph8',
        tweets: []
      },
      {
        screenName: 'akari_ph8',
        tweets: []
      },
      {
        screenName: 'sumire_ph8',
        tweets: []
      },
      {
        screenName: 'juri_ph8',
        tweets: []
      }
    ]
  }
}
