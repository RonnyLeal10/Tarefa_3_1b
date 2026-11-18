<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Patrocinador" />

      <!-- FORMULÁRIO -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <!-- NOME -->
            <div class="form-group">
              <input
                v-model="sponsor.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="Escreve o nome do patrocinador"
                required
              />
            </div>

            <!-- CONTACTO -->
            <div class="form-group">
              <input
                v-model="sponsor.contact"
                type="email"
                class="form-control form-control-lg"
                id="txtContact"
                placeholder="Escreve o email do patrocinador"
                required
              />
            </div>

<!-- ANIMAL PATROCINADO -->
<div class="form-group">
  <select
    v-model="sponsor.animal"
    class="form-control form-control-lg"
    id="txtAnimal"
    required
  >
    <option value="" disabled>Seleciona um animal</option>

    <option
      v-for="animal in getAnimals"
      :key="animal._id"
      :value="animal._id"
    >
      {{ animal.name }}
    </option>
  </select>
</div>

            <!-- BOTÕES -->
            <button
              type="submit"
              class="btn btn-outline-success btn-lg mr-2"
              :disabled="!ready"
            >
              <i class="fas fa-edit"></i>
              ATUALIZAR
            </button>

            <router-link
              :to="{ name: 'listaPatrocinadores' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i>
              CANCELAR
            </router-link>
          </form>
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
  FETCH_SPONSORS,
  EDIT_SPONSOR
} from "@/store/sponsor/sponsor.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
export default {
  name: "EditSponsor",

  components: {
    HeaderPage
  },

  data() {
    return {
      sponsor: {
        name: "",
        contact: "",
        animal: ""
      },
      ready: false,
      errorMessage: ""
    };
  },

  computed: {
    ...mapGetters("sponsor", ["getSponsors"]),
    ...mapGetters("animal", ["getAnimals"])
  },

  methods: {
    async loadSponsor() {
      this.ready = false;
      this.errorMessage = "";

      try {
        await this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`);

        const id = this.$route.params.id;
        const found = this.getSponsors.find(item => item._id === id);

        if (!found) {
          this.errorMessage = "Patrocinador não encontrado.";
          return;
        }

        this.sponsor = {
          name: found.name,
          contact: found.contact,
          animal: found.animal
            ? found.animal._id || found.animal
            : ""
        };

        this.ready = true;
      } catch (err) {
        this.errorMessage = "Não foi possível carregar o patrocinador.";
      }
    },

    
    async update() {
      if (!this.ready) return;

      this.ready = false;

      try {
        await this.$store.dispatch(`sponsor/${EDIT_SPONSOR}`, {
          _id: this.$route.params.id,
          name: this.sponsor.name.trim(),
          contact: this.sponsor.contact.trim(),
          animal: this.sponsor.animal
        });

        await this.$alert(
          "Patrocinador atualizado com sucesso!",
          "Sucesso",
          "success"
        );

        this.$router.push({ name: "listaPatrocinadores" });
      } catch (err) {
        this.$alert(
          "Não foi possível atualizar o patrocinador.",
          "Erro",
          "error"
        );
      } finally {
        this.ready = true;
      }
    }

  },

  created() {
    this.$store.dispatch(`animal/${FETCH_ANIMALS}`);
    this.loadSponsor();
  }
};
</script>
