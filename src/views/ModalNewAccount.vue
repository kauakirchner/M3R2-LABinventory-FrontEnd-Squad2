<template>
  <div class="container">
    <div class="modal fade" 
    id="newAccountModal" 
    tabindex="-1" 
    aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" 
            id="exampleModalLabel">Criar Conta</h5>
            <button 
            type="button" 
            class="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            @click="cleanForm">
            </button>
          </div>
          <div class="modal-body">
            <newuser-form 
            id="registerform" 
            :validation-schema="schema" 
            v-slot="{ errors }">
                <div class="mb-3">
                    <label class="form-label">Nome</label>
                    <newuser-field 
                    type="text" 
                    class="form-control" 
                    name="name" 
                    v-model="user.name" 
                    placeholder="ex.: Marcelo Coelho"/>
                    <span class="text-danger" 
                    v-text="errors.name" 
                    v-show="errors.name">
                    </span>
                </div>
                <div class="mb-3">
                    <label class="form-label">E-mail</label>
                    <newuser-field 
                    type="email" 
                    class="form-control" 
                    name="email" 
                    v-model="user.email" 
                    placeholder="ex.: mcoelho@email.com" />
                    <span 
                    class="text-danger" 
                    v-text="errors.email" 
                    v-show="errors.email">
                    </span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Senha</label>
                    <newuser-field 
                    type="password" 
                    class="form-control" 
                    name="password" 
                    v-model="user.password" 
                    placeholder="ex.: 1#3A5k78"
                    ref="password"/>
                    <span 
                    class="text-danger" 
                    v-text="errors.password" 
                    v-show="showError" >
                    </span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Confirme a Senha</label>
                    <newuser-field 
                    type="password" 
                    class="form-control" 
                    name="confirm-pass" 
                    v-model="confirmPassword" 
                    placeholder="ex.: 1#3A5k78"
                    data-vv-as="password"/>
                    <span 
                    class="text-danger" 
                    v-text="confirmError" 
                    v-show="showConfirmError" >
                    </span>
                </div>
                <div class="mb-3">
                  <label class="form-label">Foto</label>
                  <newuser-field 
                    type="file"
                    class="form-control"
                    name="image"
                    @change="setUserImage"
                  />
                  <span class="text-danger" v-text="errors.image"></span>
                </div> 
            </newuser-form>
          </div>
          <div class="modal-footer">
            <button 
            type="button" 
            class="btn btn-danger" 
            data-bs-dismiss="modal"
            @click="cleanForm">
            Sair
            </button>
            <button 
            type="button" 
            class="btn btn-primary" 
            data-bs-dismiss="modal"
            :disabled="disable"
            @click="setUserAccount()">
            Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field } from 'vee-validate';
import rules from '../validations/validateusers';
import { mapActions, mapState } from 'vuex';
rules;
  
export default {
  components: {
  "newuser-form": Form,
  "newuser-field": Field,
  },
  data() {
    return {
      schema: {
        name: 'required',
        email: 'required|emailcheck',
        password: 'required|password',
        image: 'required'
      
      },
      user: {},
      confirmPassword: '',
      confirmError: 'As senhas devem ser iguais.'
    }
  },
  computed: {
    ...mapState({
      success: (state) => state.users.success
    }),
    showError() {
      if (this.user.password) {
        const show = this.user.password.length;
        if (show > 0 && show < 8) {
          return true;
        }
      }
      return false;
    },
    cpwLength() {
      return this.confirmPassword.length;
    },
    pwLength() {
      if (this.user.password) {
        return this.user.password.length;
      } 
      return false;
    },
    userPw() {
      if (this.user.password) {
        return this.user.password;
      } 
      return false;
    },
    userCPw() {
      return this.confirmPassword;
    },
    
    disable() {
      if (this.cpwLength >= 8 && this.userCPw === this.userPw) {
        return false;
      }
      return true;
    },

    showConfirmError() {
      if (this.userPw) {
        if (this.cpwLength >= this.pwLength && this.userCPw !== this.userPw) {
          return true;
        }  
        return false;
      } 
      return false;
      
    }
  },
  methods: {
    ...mapActions(["users/setAccount"]),

    setUserImage(event) {
      let image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.user.image = event.target.result;
      }
      reader.readAsDataURL(image);
    },
    setUserAccount() {
      this['users/setAccount']({...this.user})
      .then(() => {
        if(this.success) {
          this.$toast.info('Conta criada com sucesso!', {position: 'top-right'});
          return true; 
        }
        this.$toast.warning('E-mail já cadastrado.', {position: 'top-right'})
      })
      .catch(() => {
      })
      .finally(() => {
        this.cleanForm();
      })
    },
    cleanForm() {
      let form = document.getElementById('registerform');
      this.confirmPassword = '';
      form.reset();
    }
  }
}
</script>
<style scoped>
  
  ::placeholder {
    font-size: 12pt;
    color: rgb(204, 201, 201);
    font-style: italic;
    font-weight: 100;
  }
  </style>