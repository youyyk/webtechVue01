<template>
  <div>
      <div>
         <label for="atDate">วันที่ : </label>
         <input type="text" v-model="form.atDate">

         <label for="incomeList"> รายการรายรับ : </label>
         <input type="text" v-model="form.incomeList">

         <label for="expendList"> รายการรายจ่าย : </label>
         <input type="text" v-model="form.expendList">
      </div>
      <br>
      <div>
          <button @click="addLedger"> ยืนยันรายการ </button>
      </div>
  </div>
</template>

<script>
import LedgerInfo from '@/store/LedgerInfo.js'
export default {
    data(){
        return{
            form: {
                atDate: "",
                incomeList: "",
                expendList: "",
                totalDay: 0
            }
        }
    },
    methods:{
        clearFiled(){
            this.form = {
                atDate: "",
                incomeList: "",
                expendList: "",
                totalDay: 0
            }
        },
        addLedger(){
            let payload={
                atDate: this.form.atDate,
                incomeList: this.form.incomeList,
                expendList: this.form.expendList,
                totalDay: this.form.totalDay
            }
            LedgerInfo.dispatch("addLedger",payload)
            this.clearFiled()
        }
    }

}
</script>

<style>

</style>