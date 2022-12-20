<template>
    <div class="containe-fluid p-4">
        <div class="container header">
            <div class="row mb-3">
                <div class="row header">
                    <label 
                    id="collab-search-title" 
                    class="form-label">
                    <h3>Buscar itens por código de patrimônio</h3>
                    </label>
                    <input 
                    class="form-control shadow" 
                    id="search-item" 
                    type="text"
                    placeholder="Digite para buscar..."
                    v-model="barraPesquisa" 
                    v-mask="'AA####-###'"
                    @input="setItems">
                </div>
            </div>
            <section class="">
                <div class="col-lg-12 col-sm-3 table-responsive">
                    <table class="table table-hover table-borderless align-middle table-striped ">
                        <thead class="table-primary">
                            <tr>
                            <th scope="col">Patrimônio</th>
                            <th scope="col ">Título</th>
                            <th scope="col ">Categoria</th>
                            <th scope="col ">Emprestado para</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                            v-for="(item, index) in (barraPesquisa ? items : itemsLocal)" 
                            :key="item.patrimonio" 
                            @click="editItem(item.patrimonio)">
                                <td 
                                data-bs-toggle="modal" 
                                data-bs-target="#editItemModal">
                                <span>{{ item.patrimonio }}</span></td>
                                <td 
                                data-bs-toggle="modal" 
                                data-bs-target="#editItemModal">
                                <span>{{ item.titulo }}</span></td>
                                <td 
                                data-bs-toggle="modal" 
                                data-bs-target="#editItemModal">
                                <span>{{ item.categoria }}</span></td>
                                <td>
                                    <select 
                                    :id="index" 
                                    class="form-select shadow" 
                                    @input="emprestar(item, index)">
                                        <option disabled selected>
                                        {{ item.emprestado }}
                                        </option>
                                        <option 
                                        v-for="name in allCollabs" 
                                        :value="name.nome" 
                                        :key="name.nome">
                                        {{name.nome}}
                                        </option>
                                        <option 
                                        v-show="item.emprestado !== 'Item disponível'" 
                                        value="Item disponível">
                                        Item disponível
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
        <ModalEditItem></ModalEditItem>
    </div>
</template>

<script>

import ModalEditItem from './ModalEditItem.vue';
import { mask } from 'vue-the-mask';

export default {
    directives: { mask },
    components: {
        ModalEditItem
    },
    data() {
        return {
            items: [],
            barraPesquisa: ''
        }
    },
    methods: {
        setItems() {
            
            if(this.barraPesquisa !== '') {
                const pesquisa = () => {
                return this.itemsLocal.filter(item =>
                    item.patrimonio
                    .toLowerCase()
                        .includes(this.barraPesquisa.toLowerCase()));
                } 
                if(pesquisa) {
                this.items = pesquisa(this.barraPesquisa);
                let count = 0;
                if(this.items.length === 0) {
                    count++
                    if (count > 0) {
                        this.$toast.clear();
                    }
                    this.$toast.error('Item não econtrado! Tente outro.', {
                        position: 'top'
                    });
                }
                } 
            } else {
                this.items = this.itemsLocal;
            }
        },
        async emprestar(item, index) {

            const nome = document.getElementById(`${index}`).value;
            item.emprestado = nome;
            item._id = Object.values(item._id)[0];
            this.$store.dispatch('itens/flagItem', item);
            const msg1 = "O item está disponível";
            const msg2 = `Item emprestado para ${nome}`;
            this.$toast.info(nome !== msg1 ? msg2 : msg1, {position: 'top'});
        },
        editItem(num) {
            this.$store.commit('itens/editItem', num);
        },
    },
    computed: {
        allCollabs() {
            return this.$store.state.collaborators.collabs;
        },
        itemsLocal() {
            return this.$store.state.itens.sendItens;
        },
    },
    mounted() {
        this.$store.dispatch('itens/getItens');
        this.$store.dispatch('collaborators/getCollabs');
    }
}
</script>
<style scoped>
h3 {
    margin-bottom: 10px;
}
.form-select {
    margin-right: 10px;
}

th {
    font-size: 1.2em;
    margin-bottom: 20px;
}
td:hover {
    cursor: pointer;
}

@media (max-width: 480px) {
    .table-container {
        width: 100%;
        padding: 0;
    }
}

section {
   width: 100%;
   min-height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 100px;
}

@media screen and (max-width: 768px) {
    section {
        padding: 50px;
    }
}

.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.shadow {
    width: 100%!important;
}

</style>