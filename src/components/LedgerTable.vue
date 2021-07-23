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
                <td v-if="index!==editIndex">{{led.atDate}}</td>
                <td v-if="index===editIndex">
                    <input type="date" v-model="form.atDate">
                </td>

                <td v-if="index!==editIndex">{{led.incomeList}}</td>
                <td v-if="index===editIndex">
                    <input type="text" v-model="form.incomeList">
                </td>

                <td v-if="index!==editIndex">{{led.expendList}}</td>
                <td v-if="index===editIndex">
                    <input type="text" v-model="form.expendList">
                </td>

                <td>{{led.totalDay}}</td>

                <td v-if="index!==editIndex">
                    <button @click="openForm(index, led)">Edit</button>
                </td>

                <td v-if="index===editIndex">
                    <button @click="editLedger">Confirm</button>
                    <button @click="closeForm">Cancel</button>
                </td>
            </tr>
        </tbody>
        <tr v-if="calTotalAll(this.ledgers.length)"> 
                {{this.totalAll}}
        </tr>
        <tr v-else>
                {{this.totalAll}}
        </tr>
     
    </table>
  </div>
</template>

<script>
import LedgerInfo from '@/store/LedgerInfo.js'
export default {
    data(){
        return{
            ledgers: [],
            size: 0,
            totalAll: 0,
            editIndex: -1,
            form: {
                atDate: "",
                incomeList: "",
                expendList: "",
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
          this.calTotalAll()
          this.size = this.ledgers.length
        },
        openForm(index, ledger){
            this.editIndex = index
            let cloned = JSON.parse(JSON.stringify(ledger))
            this.form.atDate = cloned.atDate
            this.form.incomeList = cloned.incomeList
            this.form.expendList = cloned.expendList
        },
        closeForm(){
            this.editIndex = -1
            this.form = {
                atDate: "",
                incomeList: "",
                expendList: "",
            }
        },
        async editLedger(){
            console.log(this.ledgers[this.editIndex])
            let tempIn = this.form.incomeList.split(",").map(
                (item=>item.trim())
            )
            let tempOut = this.form.expendList.split(",").map(
                (item=>item.trim())
            )
            let payload = {
                index: this.editIndex,
                dataLedger:{
                    atDate: this.form.atDate,
                    incomeList: tempIn.join(", "),
                    expendList: tempOut.join(", "),
                    totalDay: await this.calTotalDay(tempIn, tempOut)
                }
            }
            LedgerInfo.dispatch("editLedger",payload)
            this.closeForm()
            this.size -= 1
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
        },
        calTotalAll(size){
            if (this.size === size)
                return false
            this.size = size
            this.totalAll = 0
            this.ledgers.forEach(element => {
                this.totalAll += parseInt(element.totalDay)
            })
            return true
        }
    }
}
</script>

<style scoped lang="scss">
table,th,td{
    border: 1px solid black;
    border-collapse: collapse;
}
th{
    padding: 0px 45px 0px 45px;
}
tr{
    height: 40px;
}
td{
    padding: 2em;
}

</style>