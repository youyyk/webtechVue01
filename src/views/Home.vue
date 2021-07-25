<template>
  <div>
    <ledger-create> </ledger-create>
    <br>
    <ledger-table> </ledger-table>
    <br>
    <bar-chart></bar-chart>
  </div>
</template>

<script>
// @ is an alias to /src
import LedgerTable from '@/components/LedgerTable.vue'
import LedgerCreate from '@/components/LedgerCreate.vue'
import BarChart from '@/components/BarChart'

export default {
  components: {
    LedgerTable,
    LedgerCreate,
    BarChart,
  }
}
</script>