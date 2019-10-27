const fs = require ('fs');

let tweetsRAW = fs.readFileSync('models/archive-full.json');
let tweets = JSON.parse(tweetsRAW);

let text = '';

tweets.forEach((tweet) => {
    if (!tweet.is_retweet) {
        let tweetText = tweet.text;
        text = text + tweetText + '\r\n';
    }
})

fs.writeFile("dt.txt", text, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});