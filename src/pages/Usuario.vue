<template>
  <div class="Usuario">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <h1>Cadastro de Usuário</h1>
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
                <v-btn flat icon color="primary" @click="buscarUsuario">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Nome" v-model="usuario.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Clube" v-model="usuario.clube_id" :rules="regrasValidacao.clube" disabled></v-text-field>
              </v-flex>
              <v-flex xs8 pl-3>
                <v-text-field v-model="usuario.clube.nome" disabled></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon color="primary" @click.stop="buscarClube">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Login" v-model="usuario.login" :rules="regrasValidacao.login" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Senha" v-model="usuario.senha" counter :rules="!usuario.id ? regrasValidacao.senha : ''" :required="!usuario.id" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" :disabled="usuario.id ? true : false"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-select label="Tipo" v-model="usuario.tipo" :items="cbb.tipo" :rules="regrasValidacao.tipo" required autocomplete></v-select>
              </v-flex>

              <v-flex xs12>
                <v-select label="Situação" v-model="usuario.situacao" :items="cbb.situacao" :rules="regrasValidacao.situacao" required autocomplete></v-select>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <!-- Modal Usuários -->
      <v-dialog v-model="usuarios" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Usuários
          </v-card-title>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Buscar" v-model="searchUsuario"></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="lstUsuario.headers" :items="lstUsuario.items" hide-actions item-key="name" :search="searchUsuario" v-if="!lstUsuario.erro.mostrar">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarUsuario(props.item)">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.clube.nome }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-alert :type="lstUsuario.erro.tipo" :value="true" v-if="lstUsuario.erro.mostrar">
              {{lstUsuario.error.texto}}
            </v-alert>
          </v-container>
        </v-card>
      </v-dialog>

      <!-- Modal Clubes -->
      <v-dialog v-model="clubes" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Clubes
          </v-card-title>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Buscar" v-model="searchClube"></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="lstClube.headers" :items="lstClube.items" :search="searchClube" hide-actions item-key="id" v-if="!lstClube.erro.mostrar">
              <template slot="items" slot-scope="props">
                <tr @click="selecionar(props.item)">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.situacao | situacao}}</td>
                </tr>
              </template>
            </v-data-table>
            <v-alert :type="lstClube.erro.tipo" :value="true" v-if="lstClube.erro.mostrar">
              {{lstClube.error.texto}}
            </v-alert>
          </v-container>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'

export default {
  name: 'Usuario',
  components: {
    Cabecalho,
    Rodape
  },
  data () {
    return {
      e1: true,
      valid: true,
      searchClube: '',
      searchUsuario: '',
      mensagem: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      usuarios: false,
      clubes: false,
      usuario: {
        id: '',
        nome: '',
        clube: {
          código: '',
          nome: ''
        },
        login: '',
        senha: '',
        tipo: '',
        situacao: null
      },
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
        ],
        clube: [
          v => !!v || 'Clube é obrigatório'
        ],
        login: [
          v => !!v || 'Login é obrigatório'
        ],
        senha: [
          v => !!v || 'Senha é obrigatório',
          v => (v && v.length >= 8) || 'Mínimo de 8 carácteres'
        ],
        tipo: [
          v => !!v || 'Tipo é obrigatório'
        ],
        situacao: [
          v => !!v || 'Situação é obrigatório'
        ]
      },
      cbb: {
        situacao: [
          { value: '1', text: 'Ativo' },
          { value: '0', text: 'Inativo' }
        ],
        tipo: [
          { value: '1', text: 'Admin' },
          { value: '2', text: 'Secretário' },
          { value: '3', text: 'Tesoureiro' },
          { value: '4', text: 'Projetos' },
          { value: '5', text: 'Presidente' }
        ]
      },
      lstClube: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Nome', value: 'nome' },
          { text: 'Situação', value: 'situacao' }
        ],
        items: [],
        erro: {
          mostrar: false,
          texto: '',
          type: ''
        }
      },
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
  filters: {
    situacao (situacao) {
      if (!situacao) return ''
      let retorno = ''
      if (situacao === '0') {
        retorno = 'Inativo'
      } else {
        retorno = 'Ativo'
      }
      return retorno
    }
  },
  methods: {
    salvar () {
      if (this.$refs.form.validate()) {
        if (this.usuario.id) {
          this
            .axios
            .put('usuario/' + this.usuario.id, this.usuario)
            .then((success) => {
              this.limpar()
              this.mensagem = {
                tipo: 'success',
                texto: 'Salvo com sucesso!',
                mostrar: true
              }
            })
            .catch((error) => {
              this.mensagem = {
                tipo: 'error',
                texto: error,
                mostrar: true
              }
            })
        } else {
          this
            .axios
            .post('usuario', this.usuario)
            .then((success) => {
              this.limpar()
              this.mensagem = {
                tipo: 'success',
                texto: 'Salvo com sucesso!',
                mostrar: true
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
    limpar () {
      this.$refs.form.reset()
      this.mensagem = {
        tipo: '',
        texto: '',
        mostrar: false
      }
    },
    selecionarClube (item) {
      this.clubes = false
      this.usuario.clube_id = item.id
      this.usuario.clube.nome = item.nome
    },
    selecionarUsuario (item) {
      this.usuarios = false
      this.usuario = item
    },
    buscarClube () {
      this
        .axios
        .get('clube')
        .then((retorno) => {
          let lstItems = []
          for (var item in retorno.data.data) {
            let registro = retorno.data.data[item]
            lstItems.push(registro)
          }

          this.lstClube.items = lstItems
          this.lstClube.erro = { mostrar: false, texto: '', type: '' }
          this.clubes = true
        })
        .catch((error) => {
          this.lstClube.erro = { mostrar: true, texto: error, type: 'error' }
        })
    },
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
    }
  }
}
</script>

<style>

</style>
