<template>
  <div>
      <div>
         <label for="atDate">วันที่ : </label>
         <input type="date" v-model="form.atDate">

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
        async addLedger(){
            let tempIn = this.form.incomeList.split(",").map(
                (item=>item.trim())
            )
            let tempOut = this.form.expendList.split(",").map(
                (item=>item.trim())
            )
            let payload={
                atDate: this.form.atDate,
                incomeList: tempIn.join(", "),
                expendList: tempOut.join(", "),
                totalDay: await this.calTotalDay(tempIn,tempOut)
            }
            LedgerInfo.dispatch("addLedger",payload)
            this.clearFiled()
        },
        async calTotalDay(income,expend){
            let tempIncome = 0
            income.forEach(element => {
                tempIncome += parseInt(element.split(":").map(
                    (item => item.trim())
                )[1])
            });
            expend.forEach(element => {
                tempIncome -= parseInt(element.split(":").map(
                    (item => item.trim())
                )[1])
            });
            return tempIncome
        }
    }

}
</script>

<style>

</style>