<template>
  <div class="tableLedger">
    <br>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>วันที่</th>
                <th>รายรับ</th>
                <th>รายจ่าย</th>
                <th>สรุป</th>
                <th>แก้ไข</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(led, index) in ledgers" :key="index">
                <td v-if="index!==editIndex">{{led.atDate}}</td>
                <td v-if="index===editIndex">
                    <input type="date" v-model="form.atDate">
                </td>

                <td class="text-break" v-if="index!==editIndex">{{led.incomeList}}</td>
                <td v-if="index===editIndex">
                    <input type="text" v-model="form.incomeList" placeholder="A: 5000, B: 500">
                </td>

                <td v-if="index!==editIndex">{{led.expendList}}</td>
                <td v-if="index===editIndex">
                    <input type="text" v-model="form.expendList" placeholder="A: 5000, B: 500">
                </td>

                <td>{{led.totalDay}}</td>

                <td v-if="index!==editIndex">
                    <button @click="openForm(index, led)" class="btn btn-primary btn-sm">Edit</button>
                </td>

                <td v-if="index===editIndex">
                    <button @click="editLedger" class="btn btn-primary btn-sm">Confirm</button>&nbsp;
                    <button @click="closeForm" class="btn btn-primary btn-sm">Cancel</button>
                </td>
            </tr>
        </tbody>
        <br>
    </table>
    <div class="p-3 mb-2 bg-warning text-dark rounded-3" id="divTotal">
        <div v-if="calTotalAll(this.ledgers.length)"> 
                <b>รวม {{this.totalAll}} บาท</b>
        </div>
        <div>
                <b>รวม {{this.totalAll}} บาท</b>
        </div>
    </div>
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
            this.totalAll = this.totalAll.toLocaleString()
            return true
        },
    }
}
</script>

<style scoped lang="scss">
table{
    font-size: 1.2em;
    width: 100%;
}
#divTotal{
    font-size: 2em;
}

</style>