const Twitter = require('twitter')
const jsonfile = require('jsonfile')
require('dotenv').config()

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const users = [
  'ichigo_ph8',
  'aoi_ph8',
  'ran_ph8',
  'mizuki_ph8',
  'yurika_ph8',
  'akari_ph8',
  'sumire_ph8',
  'juri_ph8'
]

function getUserTimeLine (screenName, maxId, result) {
  return client.get('statuses/user_timeline', {screen_name: screenName, max_id: maxId, count: 200}).then((userTweet) => {
    if (userTweet.length === 1) {
      return result.concat(userTweet)
    }
    const oldestTweetId = userTweet[userTweet.length - 1].id_str
    return getUserTimeLine(screenName, oldestTweetId, result.concat(userTweet))
  })
}

const userTweetPromises = users.map((user) => {
  return getUserTimeLine(user, undefined, [])
})

const allTweets = Promise.all(userTweetPromises).then((userTweets) => {
  const mergedUserTweets = userTweets.reduce((previous, current) => {
    return previous.concat(current)
  }, [])
  return mergedUserTweets.map((tweet) => {
    const date = new Date(tweet.created_at)
    const to = tweet.entities.user_mentions.map((mention) => {
      return mention.screen_name
    })
    // TODO: 時差の扱い
    return {
      screenName: tweet.user.screen_name,
      tweetId: tweet.id_str,
      timestamp: date.getTime(),
      to: to
    }
  })
})

allTweets.then((result) => {
  jsonfile.writeFile('./static/tweets.json', result, { spaces: 2 }, function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('success')
    }
  })
}).catch((error) => {
  throw error
})
