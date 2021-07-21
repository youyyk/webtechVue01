<template>
  <div>
    <ledger-create> </ledger-create>
    <ledger-table> </ledger-table>
  </div>
</template>

<script>
// @ is an alias to /src
import LedgerTable from '@/components/LedgerTable.vue'
import LedgerCreate from '@/components/LedgerCreate.vue'
export default {
  components: {
    LedgerTable,
    LedgerCreate
  }
}
</script>