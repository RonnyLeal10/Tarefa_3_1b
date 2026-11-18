<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Patrocinador" />

      <!-- FORMULÁRIO -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="add">
            <!-- NOME -->
            <div class="form-group">
              <input
                v-model="sponsor.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="Escreve o nome"
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
                placeholder="Escreve o contacto (email)"
                required
              />
            </div>

            <!-- ANIMAL PATROCINADO -->
            <div class="form-group">
              <label for="txtAnimal" style="font-size: large;"
                >Animal patrocinado</label
              >

              <select
                id="txtAnimal"
                v-model="sponsor.animal"
                class="form-control form-control-lg"
                required
              >
                <option disabled value="">Seleciona um animal</option>

                <option
                  v-for="animal in animals"
                  :key="animal._id"
                  :value="animal._id"
                >
                  {{ animal.name }}
                </option>
              </select>

              <small v-if="errorMessage" class="text-danger">
                {{ errorMessage }}
              </small>
            </div>

            <!-- BOTÕES -->
            <button
              type="submit"
              class="btn btn-outline-success btn-lg mr-2"
              :disabled="
                saving ||
                  !sponsor.name.trim() ||
                  !sponsor.contact.trim() ||
                  !sponsor.animal
              "
            >
              <i class="fas fa-plus-square"></i>
              {{ saving ? "A GUARDAR..." : "ADICIONAR" }}
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
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import { ADD_SPONSOR } from "@/store/sponsor/sponsor.constants";
export default {
  name: "AddSponsor",

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
      errorMessage: "",
      saving: false
    };
  },
  computed: {
    ...mapGetters("animal", ["getAnimals"]),

    animals() {
      return this.getAnimals;
    }
  },

  created() {
    this.$store.dispatch(`animal/${FETCH_ANIMALS}`).catch(() => {
      this.errorMessage = "Não foi possível carregar os animais.";
    });
  },

  methods: {
    async add() {
      if (this.saving || !this.sponsor.animal) {
        return;
      }

      this.saving = true;
      this.errorMessage = "";

      try {
        await this.$store.dispatch(`sponsor/${ADD_SPONSOR}`, {
          name: this.sponsor.name.trim(),
          contact: this.sponsor.contact.trim(),
          animal: this.sponsor.animal
        });

        this.$router.push({ name: "listaPatrocinadores" });
      } catch (err) {
        this.errorMessage =
          "Não foi possível adicionar o patrocinador. Verifica os dados e tenta novamente.";
      } finally {
        this.saving = false;
      }
    }
  }
};
</script>
