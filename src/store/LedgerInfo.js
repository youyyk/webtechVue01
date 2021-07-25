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
        state.dataLedger.sort((a,b) => (b.atDate > a.atDate) ? 1 : ((a.atDate > b.atDate) ? -1 : 0))
    },
    edit(state, {payload}){
        state.dataLedger[payload.index] = payload.dataLedger
        state.dataLedger.sort((a,b) => (b.atDate > a.atDate) ? 1 : ((a.atDate > b.atDate) ? -1 : 0))
    },

  },
  actions: {
      fetchLedgers({commit}){
        let res = [
                {
                    atDate: "2021-04-12",
                    incomeList: "ค่าขนม: 200, เงินรางวัล: 1500",
                    expendList: "ค่าเดินทาง: 90, ค่าอาหาร: 80, ค่าน้ำ: 20",
                    totalDay: 200+1500-(90+80+20)
                },
                {
                    atDate: "2021-03-05",
                    incomeList: "ค่าขนม: 200, ขายจอคอม: 2500",
                    expendList: "ค่าอาหาร: 120, ซื้อของออนไลน์: 520",
                    totalDay: 200+2500-(120+520)
                },
                {
                    atDate: "2021-01-01",
                    incomeList: "ค่าขนม: 200",
                    expendList: "ค่าอาหาร: 250, ค่ายา: 2150",
                    totalDay: 200-(250+2150)
                },
            ]
        commit("fetch",{res})
      },
      addLedger({commit},payload){
        commit("add",{payload})
      },
      editLedger({commit}, payload){
        commit("edit",{payload})
      },
  },
  modules: {
  }
})
