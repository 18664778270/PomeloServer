let pomelo = require('pomelo');
let errorHandler = require('./app/servers/error/handler/errorHandler');
let fs = require("fs")
let abuseFilter = require("./app/servers/chat/filter/abuseFilter")
/**
 * Init app for client.
 */
let app = pomelo.createApp();


function loader(){
  require("./app/util/loader")

  app.loadConfig('mongodb', app.getBase() + '/config/mongodb.json');
  
  let mongodb_client = require('./app/components/mongodb_client');
  app.load(mongodb_client,{})  
  // app.use(sync, {sync: {path:__dirname + '/app/dao/mapping', dbclient: mongodb_client}});
}

function init(){
  app.set('name', 'pomeloDemo');
  app.set('errorHandler', errorHandler);

  // app configuration
  app.configure('production|development', 'connector|gate', function(){
    app.set('connectorConfig',
      {
        connector : pomelo.connectors.hybridconnector,
        heartbeat : 3,
        useDict : true,
        useCrypto: true,
        // useProtobuf : true,
        ssl: {
          type: 'wss',
        	key: fs.readFileSync('./../shared/2_studiototom.cn.key'),
          cert: fs.readFileSync('./../shared/1_studiototom.cn_bundle.crt'),
        }
      });
  });

// app.configure('production|development','chat',function(){
//   app.filter(abuseFilter());
// })
}

loader()

init()

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
