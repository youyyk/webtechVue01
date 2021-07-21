import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      dataLedger: []
  },
  getters:{
      ledgers: (state) => state.dataLedger
  },
  mutations: {
    fetch(state, {res}){
        state.dataLedger = res.dataLedger
    },
    add(state, {payload}){
        state.dataLedger.push(payload)
    }
  },
  actions: {
      fetchLedgers({commit}){
        let res = {
            dataLedger: [
                {
                    atDate: "01/01/2564",
                    incomeList: ["ค่าขนม: 200", "ขายรองเท้่า: 500"],
                    expendList: ["ข้าว 3 มื้อ: 120", "ค่าเดินทาง: 110"],
                    totalDay: 470
                },
                {
                    atDate: "03/05/2564",
                    incomeList: ["ค่าขนม: 200", "ขายหุ้น: 5000"],
                    expendList: ["ข้าว 3 มื้อ: 120"],
                    totalDay: 5080
                },
                {
                    atDate: "09/07/2564",
                    incomeList: ["ค่าขนม: 200"],
                    expendList: ["ข้าว 3 มื้อ: 120", "ค่าเดินทาง: 110"],
                    totalDay: -30
                }
            ]
        }
        commit("fetch",{res})
      },
      addLedger({commit},payload){

        commit("add",{payload})
      }
  },
  modules: {
  }
})
