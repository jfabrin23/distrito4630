<template>
  <div class="Login">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-layout align-center justify-center pb-3>
                <img :src="logoRosa" alt="logo" width="80%">
              </v-layout>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field prepend-icon="person" name="usuario" label="Usuário" type="text" v-model="usuario.login" :rules="regrasValidacao.login"></v-text-field>
                    <v-text-field prepend-icon="lock" name="senha" label="Senha" id="senha" type="password" v-model="usuario.senha" :rules="regrasValidacao.senha"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
                  {{mensagem.texto}}
                </v-alert>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="entrar" :loading="loading" :disabled="!valid">Acessar</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'login',
  computed: {
    user () {
      return this.$localStorage.get('user')
    }
  },
  data () {
    return {
      drawer: null,
      valid: true,
      loading: false,
      mensagem: {
        tipo: '',
        mensagem: '',
        mostrar: false
      },
      usuario: {
        login: '',
        senha: ''
      },
      regrasValidacao: {
        login: [
          v => !!v || 'Login é obrigatório'
        ],
        senha: [
          v => !!v || 'Senha é obrigatório'
        ]
      },
      logoRosa: require('../../static/img/ROSA.png')
    }
  },
  methods: {
    entrar () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this
          .axios
          .post('usuario/validalogin', this.usuario)
          .then((success) => {
            if (success.data.data[0]) {
              this.$localStorage.set('user', success.data.data[0])
              this.$router.push('home')
            } else {
              this.loading = false
              this.mensagem = {
                tipo: 'error',
                texto: 'Usuário não encontrado!',
                mostrar: true
              }
            }
          })
          .catch((error) => {
            this.mensagem = {
              tipo: 'error',
              texto: error,
              mostrar: true
            }
          })
      }
    }
  },
  props: {
    source: String
  }
}
</script>

<style>
</style>
