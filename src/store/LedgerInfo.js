import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      dataLedger: [],
  },
  getters:{
      ledgers: (state) => state.dataLedger,
  },
  mutations: {
    fetch(state, {res}){
        state.dataLedger = res
    },
    add(state, {payload}){
        state.dataLedger.push(payload)
    },
    edit(state, {payload}){
        state.dataLedger[payload.index] = payload.dataLedger
    },

  },
  actions: {
      fetchLedgers({commit}){
        let res = [
                {
                    atDate: "2021-01-01",
                    incomeList: "ค่าขนม: 200, ขายรองเท้่า: 500",
                    expendList: "ข้าว 3 มื้อ: 120, ค่าเดินทาง: 110",
                    totalDay: 200+500-(120+110)
                },
                {
                    atDate: "2021-03-05",
                    incomeList: "ค่าขนม: 200, ขายหุ้น: 5000",
                    expendList: "ข้าว 3 มื้อ: 120",
                    totalDay: 200+5000-120
                },
                {
                    atDate: "2021-04-12",
                    incomeList: "ค่าขนม: 200",
                    expendList: "ข้าว 3 มื้อ: 120, ค่าเดินทาง: 110",
                    totalDay: 200-(120+110)
                }
            ]
        commit("fetch",{res})
      },
      addLedger({commit},payload){
        commit("add",{payload})
      },
      editLedger({commit}, payload){
        console.log(payload)
        commit("edit",{payload})
      },
  },
  modules: {
  }
})
