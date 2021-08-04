import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedGFX: "W101",
    modeIn: "M",
    modeOut: "O",
  },
  mutations: {
    setSelectedGFX(state, item){
      state.selectedGFX = item;
    },
    setModeIn(state, item){
      state.modeIn = item;
    },
    setModeOut(state, item){
      state.modeOut = item;
    },
  },
  actions: {},
  modules: {},
});
