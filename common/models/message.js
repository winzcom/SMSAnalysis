const Producer = require('nsq-strategies').Producer;
const lookupdAddr = ['127.0.0.1:3000', '127.0.0.1:3000'];
const opt = { strategy: Producer.ROUND_ROBIN };

module.exports = function(Message) {
  Message.greet = function(msg, cb) {
    process.nextTick(function() {
      msg = msg || 'hello';
      Producer.singleton({ lookupdHTTPAddresses: lookupdAddr }, opt, (e, p) => {
        p.produce("greeting", msg, (err) => {
          //TODO
          // console.log(msg,err);
          cb(null, 'Sender says ' + msg + ' to receiver');
        });
      })
    });
  };


};
