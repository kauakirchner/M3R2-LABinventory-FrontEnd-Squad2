<template>
  <div class="cadastroUsuario">
    <div class="header">
      <div class="title-container">
        <p class="text-blue">Preencha os campos para cadastrar</p>
      </div>
      <div id="switch-div" class="switch-div">
        <span id="switch-editar" class="text-blue">Editar</span>
        <label class="switch">
          <input type="checkbox" @click="edit" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="container">
      <h5 class="text-light">Dados pessoais</h5>
      <collab-form
        id="collab-form"
        :validation-schema="schema"
        v-slot="{ errors }"
      >
        <div class="row mb-1">
          <div class="col-lg-3 col-sm-2">
            <label class="form-label text-light">Nome completo</label>
            <collab-field
              type="text"
              class="form-control"
              name="name"
              v-model="collab.nome"
              :disabled="disabled"
            />
            <span class="text-danger" v-text="errors.name" v-show="errors.name">
            </span>
          </div>
          <div class="col-lg-3 col-sm-2">
            <label class="form-label text-light">Foto</label>
            <collab-field
              type="file"
              class="form-control"
              name="image"
              @change="setCollaboratorImage"
              :disabled="disabled"
            />
            <span class="text-danger" v-text="errors.image" v-show="errors.image">
            </span>
          </div>
          <div class="col-lg-3 col-sm-2">
            <label class="form-label text-light">Gênero</label>
            <collab-field
              as="select"
              class="form-select"
              name="genre"
              v-model="collab.genero"
              :disabled="disabled"
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
          <div class="col-lg-3 col-sm-2">
            <label class="form-label text-light">Data de nascimento</label>
            <collab-field
              type="date"
              class="form-control"
              name="birth"
              v-model="collab.nascimento"
              :disabled="disabled"
            />
            <span
              class="text-danger"
              v-text="errors.birth"
              v-show="errors.birth"
            >
            </span>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-lg-4 col-sm-3">
            <label class="form-label text-light">Telefone</label>
            <collab-field
              type="text"
              class="form-control"
              name="phone"
              v-mask="['(##) ####-####', '(##) #####-####']"
              v-model="collab.telefone"
              placeholder="ex.: 41993166596"
              :disabled="disabled"
            />
            <span
              class="text-danger"
              v-text="errors.phone"
              v-show="errors.phone"
            >
            </span>
          </div>
          <div class="col-lg-4 col-sm-3">
            <label class="form-label text-light">E-mail</label>
            <collab-field
              type="email"
              class="form-control"
              name="email"
              v-model="collab.email"
              :disabled="disabled"
            />
            <span
              class="text-danger"
              v-text="errors.email"
              v-show="errors.email"
            >
            </span>
          </div>
          <div class="col-lg-4 col-sm-3">
            <label class="form-label text-light">Cargo</label>
            <collab-field
              as="select"
              class="form-select"
              name="job"
              v-model="collab.cargo"
              :disabled="disabled"
            >
              <option value="Front-end dev">Front-end dev</option>
              <option value="Back-end dev">Back-end dev</option>
              <option value="Fullstack dev">Fullstack dev</option>
              <option value="DevOps">DevOps</option>
            </collab-field>
            <span class="text-danger" v-text="errors.job" v-show="errors.job">
            </span>
          </div>
        </div>
        <div class="loading-container" v-show="isLoading">
          <div class="loading" />
        </div>
        <h5 class="text-light">Dados de endereço</h5>
        <div class="row mb-2">
          <div class="col-lg-4 col-sm-3">
            <label class="form-label text-light">CEP</label>
            <collab-field
              type="text"
              class="form-control"
              name="cep"
              v-mask="'#####-###'"
              v-model="cepNum"
              :disabled="disabled"
            />
            <span class="text-danger" v-text="errors.cep" v-show="errors.cep">
            </span>
            <span class="text-danger" v-text="cepError" v-show="cepError">
            </span>
          </div>
          <div class="col-lg-4 col-sm-2">
            <label class="form-label text-light">Cidade</label>
            <collab-field
              v-model="address.localidade"
              id="localidade"
              type="text"
              class="form-control"
              name="city"
              readonly
            />
          </div>
          <div class="col-lg-4 col-sm-3">
            <label class="form-label text-light">Estado</label>
            <collab-field
              v-model="address.uf"
              id="uf"
              type="text"
              class="form-control"
              name="state"
              readonly
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-lg-6 col-sm-3">
            <label class="form-label text-light">Logradouro</label>
            <collab-field
              v-model="address.logradouro"
              type="text"
              class="form-control"
              name="logradouro"
              :disabled="disabled"
            />
            <span class="text-danger" v-text="errors.logradouro" v-show="errors.logradouro">
            </span>
          </div>
          <div class="col-lg-6 col-sm-3">
            <label class="form-label text-light">Número</label>
            <collab-field
              type="text"
              class="form-control"
              name="num"
              v-mask="'######'"
              v-model="collab.numero"
              :disabled="disabled"
            />
            <span class="text-danger" v-text="errors.num" v-show="errors.num">
            </span>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-lg-4 col-sm-3">
            <label class="form-label text-light">Complemento</label>
            <collab-field
              type="text"
              class="form-control"
              name="complement"
              v-model="collab.complemento"
              :disabled="disabled"
            />
          </div>
          <div class="col-lg-4 col-sm-3">
            <label class="form-label text-light">Bairro</label>
            <collab-field
              id="bairro"
              v-model="address.bairro"
              type="text"
              class="form-control"
              name="zone"
              :disabled="disabled"
            />
          </div>
          <div class="col-lg-4 col-sm-3">
            <label class="form-label text-light">Ponto de referência</label>
            <collab-field
              type="text"
              class="form-control"
              name="ref"
              v-model="collab.referencia"
              :disabled="disabled"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-warning text-light" type="button" @click="cleanForm">
            Limpar
          </button>
          <button
            @click.prevent="saveCollab"
            type="submit"
            class="btn btn-primary"
            :disabled="isEmptyFields">
            Salvar
          </button>
        </div>
      </collab-form>
    </div>
  </div>
</template>
<script>
import { Form, Field } from "vee-validate";
import rules from "../validations/validatecollab";
import { mask } from "vue-the-mask";
import { mapState } from "vuex";

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
      cidade: "",
      schema: {
        name: "required|namecheck",
        genre: "required",
        birth: "required|birthcheck",
        phone: "required|phonecheck",
        email: "required|emailcheck",
        job: "required",
        cep: "required",
        localidade: "required",
        bairro: "required",
        logradouro: "required",
        image: "required"

      },
      collab: {},
      address: {},
      disabled: true, 
      cepNum: null,
      isLoading: false,
    };
  },
  watch: {
    cepNum() {
      if (this.cepNum.length == 9) {
        this.getCepInfo();
      }
    },
  },
  methods: {
    getCepInfo() {
      this.$store.dispatch("collaborators/cepInfo", this.cepNum).then(() => {
        this.address = {
          cep: this.cepNum,
          localidade: this.cepInfo.localidade,
          bairro: this.cepInfo.bairro,
          logradouro: this.cepInfo.logradouro,
          uf: this.cepInfo.uf,
        };
      });
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
      let collabData = {
        collab: this.collab,
        address: this.address,
      };
      this.$store
        .dispatch("collaborators/saveCollab", { ...collabData })
        .then(() => {
          if (this.exists) {
            this.$toast.error(this.msgError, { position: "top" });
          } else {
            this.$toast.info("Colaborador inserido com sucesso!", {
              position: "top",
            });
            this.isLoading = true;
            setTimeout(() => {
              this.$router.push("/users/colaboradores");
              this.cleanForm();
            }, 3000)
          }
        });
    },
    cleanForm() {
      this.collab = {};
      this.address = {};
      this.cepNum = null;
    },
    edit() {
      if (this.disabled) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
  computed: {
    ...mapState({
        cepInfo: (state) => state.collaborators.cepInfo,
        exists: (state) => state.collaborators.exists,
        msgError: (state) => state.collaborators.errorMsg,
      }),
    // Retorna Msg erro de CEP
    cepError() {
      return this.$store.getters["collaborators/errorCep"];
    },
    isEmptyFields() {
      let checkSize = Object.keys(this.collab).length + Object.keys(this.address).length;
      return Boolean(checkSize < 12);
    }
  }
}
</script>
<style scoped>

@media (max-width: 480px) {
  .text-blue {
    font-size: 18px;
  }
}
.text-blue {
  color: #2196f3;
  text-align: center;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  width: 40px;
	height: 40px;
	border: 5px solid;
	border-color: #0dcaf0 #e6e6e6 #e6e6e6;
	border-radius: 50%;
  animation: loading 3s linear infinite;
  background-position: cover;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1320px;
  margin-left: 12%;
}
#switch-editar {
  margin: 6px;
}
p {
  font-size: 1.8em;
}
h5 {
  margin-bottom: 15px;
  font-weight: 500;
}
.cadastroUsuario {
  padding: 50px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  text-align: left;
  padding: 30px;
  background-color: #2196f3;
  border-radius: 5px;
}
.form-label text-light {
  margin-bottom: 2px;
  font-size: 1em;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: #2196f3;
}
input:focus + .slider {
  box-shadow: 0 0 1px rgb(7, 201, 239);
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}

.title-container {
  display: flex;
}

.switch-div {
  display: flex;
}

</style>