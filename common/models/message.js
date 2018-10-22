// const Producer = require('nsq-strategies').Producer;
// const lookupdAddr = ['127.0.0.1:3000', '127.0.0.1:3000'];
// const opt = { strategy: Producer.ROUND_ROBIN };

module.exports = function(Message) {
  Message.greet = function(msg, cb) {
    process.nextTick(function() {
      msg = msg || 'hello';
      //Producer.singleton({ lookupdHTTPAddresses: lookupdAddr }, opt, (e, p) => {
       // p.produce("greeting", msg, (err) => {
          //TODO
          // console.log(msg,err);
            var bal  = getBalanceFromMessage(msg);
          cb(null, 'SMS ' + msg + ' to balance' + bal);
       // });
      //})
    });
  };
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function getBalanceAndamountFromMessage(message) {
  var debitOrCredit = '';
  var debit = new RegExp(/dr|debit/i);
  var credit = new RegExp(/cr|credit/i);
  if (debit.test(message)) {
    debitOrCredit = 'dr';
  }
  if (credit.test(message)) {
    debitOrCredit = 'cr';
  }
  var balance = message.match(/.bal\D*(\d+(,\d*)*)/i)[1];
  var creditOrDebitAmount = message.match(/(?:amt|Amt|debit|credit)\D*\s*(\d+(?:,\d*.?\d*)*)\s*(\w*)/i)[1];
  if (balance !== null) {
    balance = balance.replace(',', '');
  }

  return [balance, creditOrDebitAmount, debitOrCredit];
}
