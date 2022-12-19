<template>
    <!-- Componente CARD MEDIUM SIZE -->
    <label>
        <div 
        id="modal-btn" 
        data-bs-toggle="modal" 
        :data-bs-target="cardType == 'inventory' ? '#editItemModal' : '#collabModal'">
            <img 
            v-if="cardType == 'inventory'" 
            class="img" 
            :src="img" 
            alt="Imagem do item">
            <img :src="img" size="100" class="img" alt="" v-else>
            <span class="first mb-3 mt-3 lh-1 fw-bold">{{ first }}</span>
            <p class="second">{{ second }}</p>
            <p class="third">{{ third }}</p>
            <span 
            class="fourth" 
            v-if="cardType == 'inventory' && (fourth == 'Item disponível' || fourth == '')">
            Na empresa
            </span>
            <span class="fourth" v-else-if="cardType == 'inventory'">{{fourth}}</span>
            <p class="fourth" v-else-if="cardType == 'user-list'">{{ fourth }}</p>
        </div>
    </label>
</template>
<script>
export default {
    props: {
        img: {
            type: String
        },
        first: {
            type: String
        },
        second: {
            type: String
        },
        third: {
            type: String
        },
        fourth: {
            type: String
        },
        cardType: {
            type: String
        }
    },
}
</script>
<style scoped>
img {
max-width: 150px;
max-height: 100px;
}
.first {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 340px;
    background-color: #2196f3;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}
.fourth {
    font-weight: bold;
    color: #111;
}
</style>