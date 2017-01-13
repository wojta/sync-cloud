var mbaasApi = require('fh-mbaas-api-metrics');

// Seed a collection with replicas of an object, used for benchmarking.
function allSync(req, res) {
  var datasetId = req.body.dataset_id;
  var syncRecordsParams = {
    fn: 'syncRecords',
    dataset_id: datasetId,
    query_params: req.body.query_params,
    clientRecs: {}
  };

  mbaasApi.sync.invoke(datasetId, req.body, function(err, syncData) {
    if (err) {
      return res.json({error: err}).status(500);
    }
    mbaasApi.sync.invoke(datasetId, syncRecordsParams, function(err, syncRecordsData) {
      if (err) {
        return res.json({error: err}).status(500);
      }
      return res.json(syncRecordsData).status(200);
    });
  });
}


module.exports = {
  allSync: allSync
}