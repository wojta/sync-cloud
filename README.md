# FeedHenry Data Sync Tutorial Cloud App

## Environment Variables

Environment variables can be used to configure certain aspects of the app.

* `SHOULD_SCALE` - Whether the app should cluster to multiple workers. Will
only scale if the value is `true`, else the app will not scale. If the
`WORKER_COUNT` environment variable is set this will be used for the cluster
size. Otherwise the number of CPU's determined by `os.cpus()` will be used.

* `WORKER_COUNT` - The number of workers which the cluster should scale to if
`SHOULD_SCALE` is set to `true`.

* `SYNC_FREQUENCY` - The sync frequency of the `myShoppingList` dataset in
seconds.

* `WORKER_INTERVAL` - The default worker interval for sync.

* `METRICS_HOST` - The InfluxDB hostname. If this is not set then metrics will
not be configured.

* `METRICS_PORT` - The InfluxDB port.