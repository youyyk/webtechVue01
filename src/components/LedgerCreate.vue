<template>
  <div>
      <div>
         <label for="atDate">วันที่:</label>&nbsp; 
         <input type="date" v-model="form.atDate">&nbsp; 
         
         <label for="incomeList"> รายการรายรับ:</label>&nbsp; 
         <input type="text" v-model="form.incomeList" placeholder="A: 5000, B: 500">&nbsp; 

         <label for="expendList"> รายการรายจ่าย:</label>&nbsp; 
         <input type="text" v-model="form.expendList" placeholder="A: 5000, B: 500">
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
            let tempIn = this.form.incomeList
            let tempOut = this.form.expendList
            // console.log("Test"+thi+"")
            if(this.form.incomeList!=="-" && this.form.incomeList)
                tempIn = tempIn.split(",").map(
                    (item=>item.trim())
                )
            else
                tempIn = ["empty: 0"]

            if(this.form.expendList!=="-" && this.form.incomeList)
                tempOut = tempOut.split(",").map(
                    (item=>item.trim())
                )
            else
                tempOut = ["empty: 0"]
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