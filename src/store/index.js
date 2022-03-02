import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    buildings: [],
  },
  getters: {
    buildings(state) {
      return state.buildings;
    },
  },
  mutations: {
    SET_BUILDINGS(state, buildings) {
      state.buildings = buildings;
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const res = await fetch(
          "https://frontendsite-test-default-rtdb.asia-southeast1.firebasedatabase.app/buildings.json"
        );
        const data = await res.json();
        commit("SET_BUILDINGS", data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
