import sponsorService from "@/api/sponsor.service";

import {
  SET_SPONSORS,
  SET_MESSAGE,
  FETCH_SPONSORS,
  ADD_SPONSOR,
  EDIT_SPONSOR,
  REMOVE_SPONSOR
} from "./sponsor.constants";

const state = {
  sponsors: [],
  message: ""
};

const getters = {
  getSponsors: state => state.sponsors,

  getSponsorById: state => id =>
    state.sponsors.find(sponsor => sponsor._id === id),

  getMessage: state => state.message
};

const actions = {
  [FETCH_SPONSORS]: async ({ commit, rootState }) => {
    const res = await sponsorService.getSponsors(rootState.auth.token);
    commit(SET_SPONSORS, res.body);
    return res;
  },

  [ADD_SPONSOR]: async ({ commit, rootState }, payload) => {
    const res = await sponsorService.addSponsor(rootState.auth.token, payload);

    commit(
      SET_MESSAGE,
      `O patrocinador ${res.body.name} foi adicionado com sucesso!`
    );

    return res;
  },

  [EDIT_SPONSOR]: async ({ commit, rootState }, payload) => {
    const res = await sponsorService.editSponsor(rootState.auth.token, payload);

    commit(
      SET_MESSAGE,
      `O patrocinador ${res.body.name} foi atualizado com sucesso!`
    );

    return res;
  },

  [REMOVE_SPONSOR]: async ({ commit, rootState }, id) => {
    const res = await sponsorService.removeSponsor(rootState.auth.token, id);

    commit(SET_MESSAGE, "O patrocinador foi removido com sucesso!");

    return res;
  }
};

const mutations = {
  [SET_SPONSORS]: (state, sponsors) => {
    state.sponsors = sponsors;
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