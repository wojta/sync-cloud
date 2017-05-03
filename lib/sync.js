var mbaasApi = require('fh-mbaas-api');

var APP_TITLE = "vsazel-" + process.env.FH_TITLE;

mbaasApi.events.on('sync:ready', function() {
  // Set the sync config for workers to be mega-fast!
  // var pendingWorkerInterval = process.env.PENDING_WORKER_INTERVAL || 500;
  // var syncWorkerInterval = process.env.SYNC_WORKER_INTERVAL || 500;
  // var ackWorkerInterval = process.env.ACK_WORKER_INTERVAL || 500;
  // var workerConcurrency = process.env.WORKER_CONCURRENCY || 1;
  // var useCache = process.env.USE_CACHE === 'true';
  var syncConfig = {
    // pendingWorkerConcurrency: parseInt(workerConcurrency),
    // pendingWorkerInterval: parseInt(pendingWorkerInterval),
    // ackWorkerInterval: parseInt(ackWorkerInterval),
    // syncWorkerInterval: parseInt(syncWorkerInterval),
    collectStatsInterval: 4000,
    metricsInfluxdbHost: process.env.METRICS_HOST,
    metricsInfluxdbPort: parseInt(process.env.METRICS_PORT)
    // useCache: useCache
  };
  console.log('set sync config', syncConfig);
  mbaasApi.sync.setConfig(syncConfig);
  // Init the dataset
  var syncFrequency = process.env.SYNC_FREQUENCY || 120;
  var clientSyncTimeout = 24 * 60 * 60;
  console.log('Setting sync frequency to ', syncFrequency);
  var datasetCount = process.env.DATASET_COUNT || 10;
  for (var i = 1; i <= datasetCount; i++) {
    mbaasApi.sync.init('myShoppingList'+i, {syncFrequency: parseInt(syncFrequency), clientSyncTimeout: clientSyncTimeout}, function() {
    });
  }
});
