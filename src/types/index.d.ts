export interface Stats {
  chain_id: string
  epoch: string
  ledger_version: string
  oldest_ledger_version: string
  ledger_timestamp: string
  node_role: string
  oldest_block_height: string
  block_height: string
  git_hash: string
  max_tps_15_blocks: string
  latestVersion: string
  block: string
  chain: string
  avgTPS: string
  uniqueAddresses: string

  //charts
  chartTransactions: Highcharts.Options,
  chartStatAddresses: Highcharts.Options,
  chartStatSupply: Highcharts.Options,
  chartStatFee: Highcharts.Options,
  chartStatGas: Highcharts.Options,
  chartStatTps: Highcharts.Options,
}
