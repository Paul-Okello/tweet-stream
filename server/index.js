const needle = require("needle");
const config = require("dotenv").config();
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";
const streamURL =
  "https://api.twitter.com/2/tweets/search/stream?tweet.field=public_metrics&expansions=author_id,attachments.media_keys,referenced_tweets.id,geo.place_id";

const rules = [
  {
    value: "FPL",
  },
];

//   GET stream rules
async function getRules() {
  const response = await needle("get", rulesURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  console.log(response.body);
  return response.body;
}

//   SET stream rules
async function setRules() {
  const data = {
    add: rules,
  };

  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.body;
}

(async () => {
  let currentRules;
  try {
    await setRules();
    currentRules = await getRules();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
