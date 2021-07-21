<template>
  <div>
    <table>
        <thead>
            <tr>
                <th>วันที่</th>
                <th>รายรับ</th>
                <th>รายจ่าย</th>
                <th>สรุป</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(led, index) in ledgers" :key="index">
                <td>{{led.atDate}}</td>
                <td>{{led.incomeList}}</td>
                <td>{{led.expendList}}</td>
                <td>{{led.totalDay}}</td>
            </tr>
        </tbody>
        
    </table>
  </div>
</template>

<script>
import LedgerInfo from '@/store/LedgerInfo.js'
export default {
    data(){
        return{
            ledgers: [],
            editIndex: -1,
            form: {
                atDate: "",
                incomeList: "",
                expendList: "",
                totalDay: 0
            }
        }
    },
    created(){
        this.fetchLedger()
    },
    methods:{
        fetchLedger(){
          LedgerInfo.dispatch('fetchLedgers')
          this.ledgers = LedgerInfo.getters.ledgers
        },
    }
}
</script>

<style>

</style>