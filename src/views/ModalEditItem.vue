<template>
  <div class="container">
    <div
      class="modal fade"
      id="editItemModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">Editar item</h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <editItem-form
              id="editItem-form"
              :validation-schema="schema"
              v-slot="{ errors }"
            >
              <div class="row mb-3">
                <div class="col-4">
                  <label class="form-label">Patrimônio</label>
                  <editItem-field
                    disabled
                    type="text"
                    class="form-control"
                    name="patrimonio"
                    v-model="item.patrimonio"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.patrimonio"
                    v-show="errors.patrimonio"
                  >
                  </span>
                </div>
                <div class="col-8">
                  <label class="form-label">Título</label>
                  <editItem-field
                    type="text"
                    class="form-control"
                    name="titulo"
                    v-model="item.titulo"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.titulo"
                    v-show="errors.titulo"
                  >
                  </span>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-9">
                  <label class="form-label">Categoria</label>
                  <editItem-field
                    as="select"
                    class="form-select"
                    name="categoria"
                    v-model="item.categoria"
                  >
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Móveis">Móvel</option>
                    <option value="Acessórios">Acessórios</option>
                  </editItem-field>
                  <span
                    class="text-danger"
                    v-text="errors.categoria"
                    v-show="errors.categoria"
                  >
                  </span>
                </div>
                <div class="col-3">
                  <label class="form-label">Valor R$</label>
                  <editItem-field
                    type="text"
                    class="form-control"
                    name="valor"
                    v-model="item.valor"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.valor"
                    v-show="errors.valor"
                  >
                  </span>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12">
                  <label class="form-label">Imagem do item</label>
                  <editItem-field
                    type="file"
                    class="form-control"
                    ref="image"
                    name="image"
                    @change="setProductImage"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.image"
                    v-show="errors.image"
                  >
                  </span>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">Marca</label>
                  <editItem-field
                    type="text"
                    class="form-control"
                    name="marca"
                    v-model="item.marca"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.marca"
                    v-show="errors.marca"
                  ></span>
                </div>
                <div class="col-6">
                  <label class="form-label">Modelo</label>
                  <editItem-field
                    type="text"
                    class="form-control"
                    name="modelo"
                    v-model="item.modelo"
                  />
                  <span
                    class="text-danger"
                    v-text="errors.modelo"
                    v-show="errors.modelo"
                  >
                  </span>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12">
                  <label class="form-label">Descrição</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    v-model="item.descricao"
                  >
                  </textarea>
                </div>
              </div>
            </editItem-form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="delItem"
            >
              Excluir
            </button>
            <button
              type="button"
              class="btn btn-info"
              data-bs-dismiss="modal"
            >
              Sair
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="saveItem"
            >
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
import rules from "../validations/validateitens";
rules;

export default {
  components: {
    "editItem-form": Form,
    "editItem-field": Field,
  },
  data() {
    return {
      schema: {
        patrimonio: "required|patrimonycheck",
        titulo: "required",
        categoria: "required",
        valor: "required|pricecheck",
        image: "required",
        marca: "required",
        modelo: "required",
      },
      item: {}, 
    };
  },
  methods: {
    setProductImage(event) {
      let image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.item.image = event.target.result;
      }
      reader.readAsDataURL(image);
    },
    saveItem() {
      const value = this.item.valor;
      this.item.valor = value.replace(",", ".");
      this.item.valor = Number(this.item.valor);
      this.$store.dispatch("itens/saveItemedit", {
        _id: this.item._id,
        patrimonio: this.item.patrimonio,
        titulo: this.item.titulo,
        categoria: this.item.categoria,
        valor: this.item.valor,
        image: this.item.image,
        marca: this.item.marca,
        modelo: this.item.modelo,
        descricao: this.item.descricao,
        emprestado: this.item.emprestado,
      });
      const form = document.getElementById("editItem-form");
      form.reset();
    },
    delItem() {
      this.$store.dispatch("itens/delItem", this.item.patrimonio);
    },
  },
  watch: {
    edit(novoItem) {
      this.item = {
        _id: Object.values(novoItem._id)[0],
        patrimonio: novoItem.patrimonio,
        titulo: novoItem.titulo,
        categoria: novoItem.categoria,
        valor: novoItem.valor.toFixed(2).replace(".", ","),
        image: novoItem.image,
        marca: novoItem.marca,
        modelo: novoItem.modelo,
        descricao: novoItem.descricao,
        emprestado: novoItem.emprestado,
      };
    },
  },
  computed: {
    edit() {
      return this.$store.getters["itens/sendItemToEdit"];
    },
  },
};
</script>

<style scoped>
.form-label {
  margin-bottom: 1px;
}
.form-control {
  font-size: 11pt;
}
.form-select {
  font-size: 11pt;
}
</style>