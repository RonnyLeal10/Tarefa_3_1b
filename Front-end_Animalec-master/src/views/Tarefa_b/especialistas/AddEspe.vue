<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Especialista" />

      <!-- FORMULÁRIO -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="add">

            <!-- NOME -->
            <div class="form-group">
              <input
                id="txtName"
                v-model="expert.name"
                type="text"
                class="form-control form-control-lg"
                placeholder="Escreve o nome do especialista"
                required
              />
            </div>

            <!-- ÁREA DE ESPECIALIZAÇÃO -->
            <div class="form-group">
              <input
                id="txtSpecialization"
                v-model="expert.specialization"
                type="text"
                class="form-control form-control-lg"
                placeholder="Escreve a área de especialização"
                required
              />
            </div>

            
<!-- GRUPO DE ANIMAIS -->
<div class="form-group">
  <select
    v-model="expert.species"
    class="form-control form-control-lg"
    id="txtSpecies"
    required
  >
    <option value="" disabled>
      Seleciona um grupo de animais
    </option>

    <option
      v-for="group in animalGroups"
      :key="group"
      :value="group"
    >
      {{ group }}
    </option>
  </select>
</div>


            <!-- MENSAGEM DE ERRO -->
            <small v-if="errorMessage" class="text-danger">
              {{ errorMessage }}
            </small>

            <!-- BOTÕES -->
            <div class="mt-3">
              <button
                type="submit"
                class="btn btn-outline-success btn-lg mr-2"
                :disabled="
                  saving ||
                  !expert.name.trim() ||
                  !expert.specialization.trim() ||
                  !expert.species.trim()
                "
              >
                <i class="fas fa-plus-square"></i>
                {{ saving ? "A GUARDAR..." : "ADICIONAR" }}
              </button>

              <router-link
                :to="{ name: 'listaEspecialistas' }"
                tag="button"
                class="btn btn-outline-danger btn-lg"
              >
                <i class="fas fa-window-close"></i>
                CANCELAR
              </router-link>
            </div>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { ADD_EXPERT } from "@/store/expert/expert.constants";
import { mapGetters } from "vuex";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
export default {
  name: "AddExpert",

  components: {
    HeaderPage
  },

  data() {
    return {
      expert: {
        name: "",
        specialization: "",
        species: ""
      },
      errorMessage: "",
      saving: false
    };
  },

  methods: {
    async add() {
      if (
        this.saving ||
        !this.expert.name.trim() ||
        !this.expert.specialization.trim() ||
        !this.expert.species.trim()
      ) {
        return;
      }

      this.saving = true;
      this.errorMessage = "";

      try {
        await this.$store.dispatch(`expert/${ADD_EXPERT}`, {
          name: this.expert.name.trim(),
          specialization: this.expert.specialization.trim(),
          species: this.expert.species.trim()
        });

        this.$router.push({ name: "listaEspecialistas" });
      } catch (err) {
        this.errorMessage =
          "Não foi possível adicionar o especialista. Verifica os dados e tenta novamente.";
      } finally {
        this.saving = false;
      }
    }
  },

computed: {
  ...mapGetters("animal", ["getAnimals"]),

  animalGroups() {
    return [...new Set(
      this.getAnimals
        .map(animal => animal.group)
        .filter(group => typeof group === "string" && group.trim())
    )].sort();
  }
},

created() {
  this.$store.dispatch(`animal/${FETCH_ANIMALS}`)
    .catch(() => {
      this.errorMessage =
        "Não foi possível carregar os grupos de animais.";
    });
},

};
</script>
