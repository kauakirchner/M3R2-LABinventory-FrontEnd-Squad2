<template>
  <div class="container">
    <div class="modal fade" id="collabModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Conta</h5>
            <button
              type="button"
              class="btn-close"
              id="btnclose"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <collab-form
              id="collab-form"
              :validation-schema="schema"
              v-slot="{ errors }"
            >
              <!-- Primeira linha: NOME e GÊNERO -->
              <div class="row mb-1">
                <div class="col-8">
                  <label class="form-label">Nome completo</label>
                  <collab-field
                    type="text"
                    class="form-control"
                    name="name"
                    v-model="collab.nome"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.name"
                    v-show="errors.name"
                  >
                  </span>
                </div>
                <div class="col-4">
                  <label class="form-label">Gênero</label>
                  <collab-field
                    as="select"
                    class="form-select"
                    name="genre"
                    v-model="collab.genero"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </collab-field>
                  <span
                    class="text-danger"
                    v-text="errors.genre"
                    v-show="errors.genre"
                  >
                  </span>
                </div>
              </div>
              <!-- Segunda linha: EMAIL e TELEFONE -->
              <div class="row mb-1">
                <div class="col-8">
                  <label class="form-label">E-mail</label>
                  <collab-field
                    type="email"
                    class="form-control"
                    name="email"
                    v-model="collab.email"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.email"
                    v-show="errors.email"
                  >
                  </span>
                </div>
                <div class="col-4">
                  <label class="form-label">Telefone</label>
                  <collab-field
                    type="text"
                    class="form-control"
                    name="phone"
                    v-mask="['(##) ####-####', '(##) #####-####']"
                    v-model="collab.telefone"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.phone"
                    v-show="errors.phone"
                  >
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label class="form-label">Data de nascimento</label>
                  <collab-field
                    type="date"
                    class="form-control"
                    name="birth"
                    v-model="collab.nascimento"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.birth"
                    v-show="errors.birth"
                  >
                  </span>
                </div>
                <div class="col-6">
                  <label class="form-label">Cargo</label>
                  <collab-field
                    as="select"
                    class="form-select"
                    name="job"
                    v-model="collab.cargo"
                  >
                    <option value="Front-end dev">Front-end dev</option>
                    <option value="Back-end dev">Back-end dev</option>
                    <option value="Fullstack dev">Fullstack dev</option>
                    <option value="DevOps">DevOps</option>
                  </collab-field>
                  <span
                    class="text-danger"
                    v-text="errors.job"
                    v-show="errors.job"
                  >
                  </span>
                </div>
                <div class="col-12">
                  <label class="form-label">Foto</label>
                  <collab-field
                    type="file"
                    class="form-control"
                    name="image"
                    @change="setCollaboratorImage"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.image"
                    v-show="errors.image"
                  >
                  </span>
                </div>
              </div>

              <h5 class="mt-3">Dados de endereço</h5>
              <div class="row mb-1">
                <div class="col-4">
                  <label class="form-label">CEP</label>
                  <collab-field
                    type="text"
                    class="form-control"
                    name="cep"
                    v-mask="'#####-###'"
                    v-model="cepNum"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.cep"
                    v-show="errors.cep"
                  >
                  </span>
                  <span class="text-danger" v-text="errorMsg" v-show="errorMsg">
                  </span>
                </div>
                <div class="col-5">
                  <label class="form-label">Cidade</label>
                  <collab-field
                    id="localidade"
                    type="text"
                    v-model="collab.localidade"
                    class="form-control"
                    name="city"
                    readonly
                  />
                </div>
                <div class="col-3">
                  <label class="form-label">Estado</label>
                  <collab-field
                    id="uf"
                    v-model="collab.uf"
                    type="text"
                    class="form-control"
                    name="state"
                    readonly
                  />
                </div>
              </div>
              <div class="row mb-1">
                <div class="col-9">
                  <label class="form-label">Logradouro</label>
                  <collab-field
                    id="logradouro"
                    v-model="collab.logradouro"
                    type="text"
                    class="form-control"
                    name="street"
                  />
                </div>
                <div class="col-3">
                  <label class="form-label">Número</label>
                  <collab-field
                    type="text"
                    v-mask="'######'"
                    class="form-control"
                    name="num"
                    v-model="collab.numero"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.num"
                    v-show="errors.num"
                  >
                  </span>
                </div>
              </div>
              <div class="row mb-1">
                <div class="col-6">
                  <label class="form-label">Complemento</label>
                  <collab-field
                    type="text"
                    class="form-control"
                    name="complement"
                    v-model="collab.complemento"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.complement"
                    v-show="errors.complement"
                  >
                  </span>
                </div>
                <div class="col-6">
                  <label class="form-label">Bairro</label>
                  <collab-field
                    id="bairro"
                    v-model="collab.bairro"
                    type="text"
                    class="form-control"
                    name="zone"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Ponto de referência</label>
                  <collab-field
                    type="text"
                    class="form-control"
                    name="ref"
                    v-model="collab.referencia"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.ref"
                    v-show="errors.ref"
                  >
                  </span>
                </div>
              </div>
            </collab-form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="delCollab"
            >
              Excluir
            </button>
            <button
              type="button"
              class="btn btn-info"
              data-bs-dismiss="modal"
              @click="cleanForm"
            >
              Sair
            </button>
            <button type="button" class="btn btn-primary" @click="saveCollab">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import rules from "../validations/validatecollab";
import { mask } from "vue-the-mask";
import { mapActions, mapMutations, mapState } from "vuex";
rules;

export default {
  directives: {
    mask,
  },
  components: {
    "collab-form": Form,
    "collab-field": Field,
  },
  data() {
    return {
      schema: {
        name: "required|namecheck",
        genre: "required",
        birth: "required|birthcheck",
        phone: "required|phonecheck",
        email: "required|emailcheck",
        job: "required",
        cep: "required",
        image: "required"
      },
      collab: {},
      cepNum: null, 
    };
  },
  watch: {
    async getSelectedId(newId) {
      await this.$store
        .dispatch("collaborators/getOneCollab", newId)
        .then((response) => {
          this.collab = response;
          this.cepNum = response.cep;
        });
    },
    cepNum() {
      if (this.cepNum && this.cepNum.length == 9 && this.cepNum !== this.collab.cep) {
        this.getCepInfo();
      }
    },
  },
  methods: {
    ...mapMutations(["collaborators/setEditUser"]),
    ...mapActions(["collaborators/saveCollab", "collaborators/DelCollab"]),

    getCepInfo() {
      this.$store.dispatch("collaborators/cepInfo", this.cepNum).then(() => {
        this.collab.localidade = this.cepInfo.localidade;
        this.collab.uf = this.cepInfo.uf;
        this.collab.logradouro = this.cepInfo.logradouro;
        this.collab.bairro = this.cepInfo.bairro;
      })
    },

    setCollaboratorImage(event) {
      let image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.collab.foto = event.target.result;
      }
      reader.readAsDataURL(image);
    },

    saveCollab() {
      this["collaborators/setEditUser"](true);
      this.collab._id = Object.values(this.collab._id)[0];
      this["collaborators/saveCollab"]({ ...this.collab })
      .then(() => {
        const btn = document.getElementById("btnclose");
        btn.click();
      });
      this.$toast.info("Colaborador Atualizado com sucesso!", {
        position: "top",
      });
    },

    delCollab() {
      const idCollab = this.$store.getters["collaborators/sendSelectedId"];
      this["collaborators/DelCollab"](idCollab).then(() => {
        this.$toast.info("Colaborador Excluido com sucesso!", {
          position: "top",
        });
      });
    },

    cleanForm() {
      const form = document.getElementById("collab-form");
      form.reset();
      this.collab = {};
      this.cepNum = null;
    },
  },
  computed: {
    ...mapState({
      editUser: (state) => state.collaborators.editUser,
      cepInfo: (state) => state.collaborators.cepInfo
    }),
    errorMsg() {
      return this.$store.getters["collaborators/sendErrorMsg"];
    },
    getSelectedId() {
      return this.$store.getters["collaborators/sendSelectedId"];
    },
  },
};
</script>

<style scoped>
.form-label {
  margin-bottom: 1px;
}
</style>
