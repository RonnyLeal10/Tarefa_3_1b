import expertService from "@/api/expert.service";

import {
  SET_EXPERTS,
  SET_MESSAGE,
  FETCH_EXPERTS,
  ADD_EXPERT,
  EDIT_EXPERT,
  REMOVE_EXPERT
} from "./expert.constants";

const state = {
  experts: [],
  message: ""
};

const getters = {
  getExperts: state => state.experts,

  getExpertById: state => id =>
    state.experts.find(expert => expert._id === id),

  getMessage: state => state.message
};

const actions = {
  [FETCH_EXPERTS]: async ({ commit, rootState }) => {
    const res = await expertService.getExperts(rootState.auth.token);
    commit(SET_EXPERTS, res.body);
    return res;
  },

  [ADD_EXPERT]: async ({ commit, rootState }, payload) => {
    const res = await expertService.addExpert(rootState.auth.token, payload);

    commit(
      SET_MESSAGE,
      `O especialista ${res.body.name} foi adicionado com sucesso!`
    );

    return res;
  },

  [EDIT_EXPERT]: async ({ commit, rootState }, payload) => {
    const res = await expertService.editExpert(rootState.auth.token, payload);

    commit(
      SET_MESSAGE,
      `O especialista ${res.body.name} foi atualizado com sucesso!`
    );

    return res;
  },

  [REMOVE_EXPERT]: async ({ commit, rootState }, id) => {
    const res = await expertService.removeExpert(rootState.auth.token, id);

    commit(SET_MESSAGE, "O especialista foi removido com sucesso!");

    return res;
  }
};

const mutations = {
  [SET_EXPERTS]: (state, experts) => {
    state.experts = experts;
  },

  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
