<template>

<div class="container p-4">
    <div id="listcollab-header">
        <label 
        id="collab-search-title" 
        class="form-label"><h3>Buscar um colaborador</h3>
        </label>
        <input 
        class="form-control" 
        type="text" 
        id="search-user" 
        placeholder="Digite para buscar..."
        v-model="barraPesquisa" 
        @input="setCollabs">
    </div>
    <div id="collab-cards">
        <div  class="cards shadow" v-for="collab in collabs" :key="collab._id.$oid">
            <MediumCard
            cardType="user-list" 
            :img="collab.email" 
            :first="collab.nome" 
            :second="collab.email" 
            :third="collab.telefone" 
            :fourth="collab.cargo" 
            @click="collabDetails(collab)">
            </MediumCard>
        </div>
    </div>
    <ModalColaboradores></ModalColaboradores>
</div>
</template>
<script>

import ModalColaboradores from './ModalColaboradores.vue';
import MediumCard from '@/components/MediumCard.vue';
import { mapActions } from 'vuex';

export default {
    components: {
        ModalColaboradores,
        MediumCard
    },
    data() {
        return {
            // Inicialmente populada pelo mounted, depois pela barra de busca
            collabs: [],
            barraPesquisa: '' 
        }
    },
    watch: {
        allCollabs() {
            this.collabs = this.allCollabs;
        }
    },
    methods: {
        ...mapActions(["collaborators/getCollabs"]),
        collabDetails(item) {
            const id = Object.values(item._id)[0];
            this.$store.commit('collaborators/setSelectedId', id);
        },
        setCollabs() {
            if(this.barraPesquisa !== '') {
                let pesquisa = () => {
                return this.allCollabs.filter(item =>
                    item.nome
                    .toLowerCase()
                        .includes(this.barraPesquisa.toLowerCase()));
                } 
                if(pesquisa) {
                this.collabs = pesquisa(this.barraPesquisa);
                let count = 0;
                if(this.collabs.length === 0) {
                    count++
                    if (count > 0) {
                        this.$toast.clear();
                    }
                    this.$toast.error('Usuário não econtrado! Tente outro.', {
                    position: 'top'
                    });
                }
                } 
            } else {
                this.collabs = this.allCollabs;
            }
        }
    },
    computed: {
        allCollabs() {
            return this.$store.state.collaborators.collabs;
        },
    },
    mounted() {
        this['collaborators/getCollabs']()
        .then(() => {
            this.collabs = this.allCollabs;
        })
    }
}
</script>

<style scoped>
/* Div de cada CARD */
.cards {
    margin: 15px;
    border-radius: 10px;
}
/* Div geral de todos os CARDS */
#collab-cards {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border-radius: 10px;
}
/* Div da BARRA DE BUSCA */
#listcollab-header {
    margin-bottom: 40px;
    margin-top: 40px;
}
/* Título da BARRA DE BUSCA */
#collab-search-title {
    font-size: 1.5em;
}
</style>