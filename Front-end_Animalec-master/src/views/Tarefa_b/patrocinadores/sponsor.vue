<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Patrocinadores" />

      <!-- MENU TOPO -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addPatrocinador' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i>
            ADICIONAR PATROCINADOR
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
                  <th scope="col">CONTACTO</th>
                  <th scope="col">ANIMAL PATROCINADO</th>
                  <th scope="col">AÇÕES</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="loading">
                  <td colspan="4" class="text-center">
                    A carregar patrocinadores...
                  </td>
                </tr>

                <tr v-else-if="errorMessage">
                  <td colspan="4" class="text-center text-danger">
                    {{ errorMessage }}
                  </td>
                </tr>

                <tr v-else-if="sponsors.length === 0">
                  <td colspan="4" class="text-center">
                    Nenhum patrocinador encontrado.
                  </td>
                </tr>

                <tr v-for="sponsor in sponsors" v-else :key="sponsor._id">
                  <td>{{ sponsor.name }}</td>
                  <td>{{ sponsor.contact }}</td>
                  <td>
                    {{
                      sponsor.animal && sponsor.animal.name
                        ? sponsor.animal.name
                        : "Não disponível"
                    }}
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'editPatrocinador',
                        params: { id: sponsor._id }
                      }"
                      class="btn btn-outline-warning btn-sm"
                    >
                      <i class="fas fa-edit"></i>
                      EDITAR
                    </router-link>
                    <button type="button" class="btn btn-outline-danger btn-sm ml" @click="deleteSponsor(sponsor)">
                      <i class="fas fa-trash-alt"></i>
                      APAGAR
                    </button>
                  </td>
                </tr>
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
import {FETCH_SPONSORS,REMOVE_SPONSOR} from "@/store/sponsor/sponsor.constants";
export default {
  name: "ManageSponsors",

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
    ...mapGetters("sponsor", ["getSponsors"]),

    sponsors() {
      return this.getSponsors;
    }
  },

  methods: {
    async fetchSponsors() {
      this.loading = true;
      this.errorMessage = "";

      try {
        await this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`);
      } catch (err) {
        this.errorMessage = "Não foi possível carregar os patrocinadores.";
      } finally {
        this.loading = false;
      }
    },
    async deleteSponsor(sponsor) {
  const result = await this.$confirm(
    `Tens a certeza de que queres apagar o patrocinador "${sponsor.name}"?`,
    "Confirmar eliminação",
    "warning"
  );

  if (!result) return;

  try {
    await this.$store.dispatch(`sponsor/${REMOVE_SPONSOR}`, sponsor._id);

    await this.fetchSponsors();

    await this.$alert(
      "Patrocinador apagado com sucesso!",
      "Sucesso",
      "success"
    );
  } catch (err) {
    this.$alert(
      "Não foi possível apagar o patrocinador.",
      "Erro",
      "error"
    );
  }
}
  },

  created() {
    this.fetchSponsors();
  }
};
</script>
