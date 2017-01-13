var mbaasApi = require('fh-mbaas-api-metrics');

var APP_TITLE = "sync-horizontal-scaling-" + process.env.FH_TITLE;

// Define config for MongoDB.
var mongoUrl = process.env.FH_MONGODB_CONN_URL;

// Define config for Redis.
var redisHost = process.env.FH_REDIS_HOST || '127.0.0.1';
var redisPort = process.env.FH_REDIS_PORT || 6379;
var redisUrl = 'redis://' + redisHost + ':' + redisPort;

// Define config for metrics (only if env vars exist).
var metricsConfig;
if (process.env.METRICS_HOST && process.env.METRICS_PORT) {
  console.log('Enabling metrics', process.env.METRICS_HOST, process.env.METRICS_PORT);
  metricsConfig = {
    host: process.env.METRICS_HOST,
    port: process.env.METRICS_PORT,
    enabled: !!process.env.METRICS_HOST
  };
};

// Initialise all of this stuff.
mbaasApi.sync.connect(mongoUrl, redisUrl, metricsConfig, function(err, mongo, redis, metrics) {
  // Set the sync config for workers to be mega-fast!
  var workerInterval = process.env.WORKER_INTERVAL || 1000;
  console.log('Setting worker interval to ', workerInterval);
  var syncConfig = { workerInterval: parseInt(workerInterval) };
  mbaasApi.sync.setConfig(syncConfig);

  // Memory and CPU monitoring
  metrics.memory(APP_TITLE, {interval: 4000}, function(err){
    if(err) console.error(err);
  });
  metrics.cpu(APP_TITLE, {interval: 4000}, function(err){
    if(err) console.error(err);
  });
  var syncFrequency = process.env.SYNC_FREQUENCY || 120;
  console.log('Setting sync frequency to ', syncFrequency);
  // Init the dataset
  mbaasApi.sync.init('myShoppingList', { syncFrequency: parseInt(syncFrequency) }, function() {});
})
