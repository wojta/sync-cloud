var mbaasApi = require('fh-mbaas-api-metrics');

var APP_TITLE = "sync-horizontal-scaling-" + process.env.FH_TITLE;

mbaasApi.events.on('sync:ready', function(){
  // Set the sync config for workers to be mega-fast!
  var workerInterval = process.env.WORKER_INTERVAL || 1000;
  var useCache = process.env.USE_CACHE === 'true';
  var syncConfig = { 
    workerInterval: parseInt(workerInterval),
    collectStatsInterval: 4000, 
    metricsInfluxdbHost: process.env.METRICS_HOST,
    metricsInfluxdbPort: parseInt(process.env.METRICS_PORT),
    useCache: useCache
  };
  console.log('set sync config', syncConfig);
  mbaasApi.sync.setConfig(syncConfig);
  // Init the dataset
  var syncFrequency = process.env.SYNC_FREQUENCY || 120;
  var clientSyncTimeout = 24*60*60;
  console.log('Setting sync frequency to ', syncFrequency);
  mbaasApi.sync.init('myShoppingList', { syncFrequency: parseInt(syncFrequency), clientSyncTimeout: clientSyncTimeout }, function() {});
});
