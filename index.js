const steem = require('steem');

const ACCOUNT_NAME = 'badbadrobot';
const ACCOUNT_KEY = process.env.STEEM_PRIVATE_KEY;
const TARGET_ACCOUNT = 'steemcleaners';

steem.api.streamTransactions('head', function (err, result) {

  let txType = result.operations[0][0]
  let txData = result.operations[0][1]


  if (txType == 'comment' && txData.author == TARGET_ACCOUNT) {
    console.log(TARGET_ACCOUNT, ': has just commented')
    console.log(txData);
    sendComment(txData.author, txData.permlink);
  }
});

function sendComment(parentAuthor, parentPermlink) {
  const permlink = steem.formatter.commentPermlink(parentAuthor, parentPermlink)
  steem.broadcast.comment(ACCOUNT_KEY, parentAuthor, parentPermlink, ACCOUNT_NAME, permlink, '', 'This comment is likely an error due to the high number of false positives by this bot. Please do your own research before passing judgement.', {}, function(err, result) {
    console.log(err, result);
  });
}