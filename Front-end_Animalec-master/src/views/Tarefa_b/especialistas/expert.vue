<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Especialistas" />

      <!-- MENU TOPO -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addEspecialista' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i>
            ADICIONAR ESPECIALISTA
          </router-link>

          <router-link
            :to="{ name: 'admin' }"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2"
          >
            <i class="fas fa-bars"></i>
            MENU PRINCIPAL
          </router-link>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <!-- TABELA -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">NOME</th>
                  <th scope="col">ÁREA DE ESPECIALIZAÇÃO</th>
                  <th scope="col">ESPÉCIES</th>
                  <th scope="col">AÇÕES</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="loading">
                  <td colspan="4" class="text-center">
                    A carregar especialistas...
                  </td>
                </tr>

                <tr v-else-if="errorMessage">
                  <td colspan="4" class="text-center text-danger">
                    {{ errorMessage }}
                  </td>
                </tr>

                <tr v-else-if="experts.length === 0">
                  <td colspan="4" class="text-center">
                    Nenhum especialista encontrado.
                  </td>
                </tr>

                <template v-else>
                  <tr v-for="expert in experts" :key="expert._id">
                    <td>{{ expert.name }}</td>
                    <td>{{ expert.specialization }}</td>
                    <td>{{ expert.species }}</td>
                    <td>
                      <router-link
                        :to="{
                          name: 'editEspecialista',
                          params: { id: expert._id }
                        }"
                        class="btn btn-outline-warning btn-sm"
                      >
                        <i class="fas fa-edit"></i>
                        EDITAR
                      </router-link>

                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm ml-2"
                        @click="deleteExpert(expert)"
                      >
                        <i class="fas fa-trash-alt"></i>
                        APAGAR
                      </button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

import {
  FETCH_EXPERTS,
  REMOVE_EXPERT
} from "@/store/expert/expert.constants";

export default {
  name: "ManageExperts",

  components: {
    HeaderPage
  },

  data() {
    return {
      loading: false,
      errorMessage: ""
    };
  },

  computed: {
    ...mapGetters("expert", ["getExperts"]),

    experts() {
      return this.getExperts;
    }
  },

  methods: {
    async fetchExperts() {
      this.loading = true;
      this.errorMessage = "";

      try {
        await this.$store.dispatch(`expert/${FETCH_EXPERTS}`);
      } catch (err) {
        this.errorMessage = "Não foi possível carregar os especialistas.";
      } finally {
        this.loading = false;
      }
    },

    async deleteExpert(expert) {
      const result = await this.$confirm(
        `Tens a certeza de que queres apagar o especialista "${expert.name}"?`,
        "Confirmar eliminação",
        "warning"
      );

      if (!result) return;

      try {
        await this.$store.dispatch(
          `expert/${REMOVE_EXPERT}`,
          expert._id
        );

        await this.fetchExperts();

        await this.$alert(
          "Especialista apagado com sucesso!",
          "Sucesso",
          "success"
        );
      } catch (err) {
        this.$alert(
          "Não foi possível apagar o especialista.",
          "Erro",
          "error"
        );
      }
    }
  },

  created() {
    this.fetchExperts();
  }
};
</script>
