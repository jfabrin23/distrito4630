<template>
  <div class="AlterarSenha">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <h1>Alterar Senha</h1>
          <hr />

          <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
            {{mensagem.texto}}
          </v-alert>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="usuario.id" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click="buscarUsuario" v-show="user.tipo === '1'">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Nome" v-model="usuario.nome" disabled></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Login" v-model="usuario.login" disabled></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field type="password" label="Senha anterior" v-model="usuario.senhaantiga" :rules="user.tipo !== '1' || user.id === usuario.id ? regrasValidacao.senhaantiga : ''" :required="user.tipo !== '1' || user.id === usuario.id"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field type="password" label="Nova Senha" v-model="usuario.senhanova" :rules="regrasValidacao.senhanova" required></v-text-field>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid" :loading="loading">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <!-- Modal Usuários -->
      <ModalUsuario :lstUsuario='lstUsuario' :modal='usuarios' v-on:usuario="selecionarUsuario" v-on:usuarios="closeUsuario" v-if="usuarios"></ModalUsuario>

      <Rodape />
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'
import ModalUsuario from '@/components/ModalUsuario'

export default {
  name: 'Clube',
  components: {
    Cabecalho,
    Rodape,
    ModalUsuario
  },
  computed: {
    user () {
      return this.$localStorage.get('user')
    }
  },
  data () {
    return {
      valid: true,
      loading: false,
      mensagem: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      usuario: {
        id: '',
        nome: '',
        login: '',
        senhaantiga: '',
        senhanova: ''
      },
      regrasValidacao: {
        senhaantiga: [
          v => !!v || 'Senha é obrigatório'
        ],
        senhanova: [
          v => !!v || 'Senha é obrigatório',
          v => (v && v.length >= 4) || 'Mínimo de 4 carácteres'
        ]
      },
      usuarios: false,
      lstUsuario: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Nome', value: 'nome' },
          { text: 'Clube', value: 'clube' }
        ],
        items: [],
        erro: {
          mostrar: false,
          texto: '',
          type: ''
        }
      }
    }
  },
  methods: {
    buscarUsuario () {
      this
        .axios
        .get('usuario')
        .then((retorno) => {
          let lstItems = []
          for (var item in retorno.data.data) {
            if (retorno.data.data[item].id) {
              let registro = retorno.data.data[item]
              lstItems.push(registro)
            }
          }

          this.lstUsuario.items = lstItems
          this.lstUsuario.erro = { mostrar: false, texto: '', type: '' }
          this.usuarios = true
        })
        .catch((error) => {
          this.lstUsuario.erro = { mostrar: true, texto: error, type: 'error' }
        })
    },
    closeUsuario (val) {
      this.usuarios = val
    },
    limpar () {
      this.$refs.form.reset()
      this.btnExcluir = true
    },
    salvar () {
      if (this.$refs.form.validate()) {
        this.loading = true
        if ((this.user.senha === this.usuario.senhaantiga) || ((this.user.tipo === '1') && (this.user.id !== this.usuario.id))) {
          this
            .axios
            .put('usuario/' + this.usuario.id, {'senha': this.usuario.senhanova})
            .then((success) => {
              this.loading = false
              this.limpar()
              let msg = 'Senha alterada com sucesso!'
              if (this.user.id === this.usuario.id) {
                setTimeout(function () { location.href = '#/sair' }, 3000)
                msg = 'Senha alterada com sucesso! AGUARDE, estamos reiniciando o programa...'
              }
              this.mensagem = {
                tipo: 'success',
                texto: msg,
                mostrar: true
              }
            })
            .catch((error) => {
              this.loading = false
              this.mensagem = {
                tipo: 'error',
                texto: error,
                mostrar: true
              }
            })
        } else {
          this.loading = false
          this.mensagem = {
            tipo: 'error',
            texto: 'Senha Anterior não confere',
            mostrar: true
          }
        }
      }
    },
    selecionarUsuario (item) {
      this.usuario = item
      this.usuarios = false
      this.btnExcluir = false
    }
  },
  mounted () {
    this.usuario = this.user
  }
}
</script>

<style>

</style>
