<template>
  <div>
      <div>
         <label for="atDate">วันที่:</label>&nbsp; 
         <input type="date" v-model="form.atDate">&nbsp; 

         <label for="incomeList"> รายการรายรับ:</label>&nbsp; 
         <input type="text" v-model="form.incomeList">&nbsp; 

         <label for="expendList"> รายการรายจ่าย:</label>&nbsp; 
         <input type="text" v-model="form.expendList">
      </div>
      <br>
      <div class="d-grid gap-2 col-6 mx-auto">
          <button @click="addLedger" class="btn btn-success" id="btnConfirmฺ">
              ยืนยันรายการ
          </button>
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

<style scoped lang="scss">
#btnConfirmฺ{
    font-size: 1.2em;
}
</style>