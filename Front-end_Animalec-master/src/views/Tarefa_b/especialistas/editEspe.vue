<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Especialista" />

      <!-- FORMULÁRIO -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">

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
    id="txtSpecies"
    v-model="expert.species"
    class="form-control form-control-lg"
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
                  !ready ||
                  saving ||
                  !expert.name.trim() ||
                  !expert.specialization.trim() ||
                  !expert.species.trim()
                "
              >
                <i class="fas fa-edit"></i>
                {{ saving ? "A GUARDAR..." : "ATUALIZAR" }}
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
import { mapGetters } from "vuex";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";

import {
  FETCH_EXPERTS,
  EDIT_EXPERT
} from "@/store/expert/expert.constants";

export default {
  name: "EditExpert",

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
      ready: false,
      saving: false,
      errorMessage: ""
    };
  },

  
computed: {
  ...mapGetters("expert", ["getExperts"]),
  ...mapGetters("animal", ["getAnimals"]),

  animalGroups() {
    return [...new Set(
      this.getAnimals
        .map(animal => animal.group)
        .filter(group =>
          typeof group === "string" && group.trim()
        )
    )].sort();
  }
},


  methods: {
    async loadExpert() {
      this.ready = false;
      this.errorMessage = "";

      try {
        await this.$store.dispatch(`expert/${FETCH_EXPERTS}`);

        const id = this.$route.params.id;
        const found = this.getExperts.find(
          item => item._id === id
        );

        if (!found) {
          this.errorMessage = "Especialista não encontrado.";
          return;
        }

        this.expert = {
          name: found.name || "",
          specialization: found.specialization || "",
          species: found.species || ""
        };

        this.ready = true;
      } catch (err) {
        this.errorMessage =
          "Não foi possível carregar os dados do especialista.";
      }
    },

    async update() {
      if (
        !this.ready ||
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
        await this.$store.dispatch(`expert/${EDIT_EXPERT}`, {
          _id: this.$route.params.id,
          name: this.expert.name.trim(),
          specialization: this.expert.specialization.trim(),
          species: this.expert.species.trim()
        });

        await this.$alert(
          "Especialista atualizado com sucesso!",
          "Sucesso",
          "success"
        );

        this.$router.push({ name: "listaEspecialistas" });
      } catch (err) {
        this.errorMessage =
          "Não foi possível atualizar o especialista.";
      } finally {
        this.saving = false;
      }
    }
  },

  
async created() {
  try {
    await this.$store.dispatch(`animal/${FETCH_ANIMALS}`);
    await this.loadExpert();
  } catch (err) {
    this.errorMessage =
      "Não foi possível carregar os grupos de animais.";
  }
}

};
</script>
