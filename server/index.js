const needle = require("needle");
const config = require("dotenv").config();
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";
const streamURL =
  "https://api.twitter.com/2/tweets/search/stream?tweet.field=public_metrics&expansions=author_id,attachments.media_keys,referenced_tweets.id,geo.place_id";
