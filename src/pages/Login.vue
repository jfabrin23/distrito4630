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
                  <v-form>
                    <v-text-field prepend-icon="person" name="usuario" label="Usuário" type="text"></v-text-field>
                    <v-text-field prepend-icon="lock" name="senha" label="Senha" id="senha" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="entrar">Acessar</v-btn>
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
      logoRosa: require('../../static/img/ROSA.png')
    }
  },
  methods: {
    entrar () {
      /* let chablau = this.user
      chablau.push({ id: 3, nome: 'Paulo Celso de Brito Jr', clube: { id: 4, nome: 'Rotaract Club de Goioerê' }, tipo: 'admin', avatar: '../../static/img/Avatar/avatar.jpg' })
      this.$localStorage.set('user', chablau) */
      this.$router.push('home')
    }
  },
  props: {
    source: String
  }
}
</script>

<style>
</style>
