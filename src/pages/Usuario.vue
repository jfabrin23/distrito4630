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

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="usuario.codigo" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click.stop="usuarios = !usuarios">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Nome" v-model="usuario.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Clube" v-model="usuario.clube.codigo" :rules="regrasValidacao.clube" disabled></v-text-field>
              </v-flex>
              <v-flex xs8 pl-3>
                <v-text-field v-model="usuario.clube.nome" disabled></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon color="primary" @click.stop="clubes = !clubes">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Login" v-model="usuario.login" :rules="regrasValidacao.login" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Senha" v-model="usuario.senha" counter :rules="!usuario.codigo ? regrasValidacao.senha : ''" :required="!usuario.codigo" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" :disabled="usuario.codigo ? true : false"></v-text-field>
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
          <v-card-title class="grey lighten-4 py-4 title">
            Lista de Usuários
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-data-table :headers="lstUsuario.headers" :items="lstUsuario.items" hide-actions item-key="name">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarUsuario(props.item)">
                  <td>{{ props.item.codigo }}</td>
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.clube.nome }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-dialog>

      <!-- Modal Clubes -->
      <v-dialog v-model="clubes" width="800px">
        <v-card>
          <v-card-title class="grey lighten-4 py-4 title">
            Lista de Clubes
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-data-table :headers="lstClube.headers" :items="lstClube.items" hide-actions item-key="name">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarClube(props.item)">
                  <td>{{ props.item.codigo }}</td>
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.situacao }}</td>
                </tr>
              </template>
            </v-data-table>
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
      usuarios: false,
      clubes: false,
      usuario: {
        codigo: '',
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
          'Ativo',
          'Inativo'
        ],
        tipo: [
          'Admin',
          'Secretário',
          'Tesoureiro',
          'Projetos'
        ]
      },
      lstClube: {
        headers: [
          { text: 'Código', value: 'codigo' },
          { text: 'Nome', value: 'nome' },
          { text: 'Situação', value: 'situacao' }
        ],
        items: [
          {
            value: false,
            codigo: 1,
            nome: 'Rotaract Club de Cruzeiro do Oeste',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 2,
            nome: 'Rotaract Club de Cianorte',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 3,
            nome: 'Rotaract Club de Umuarama',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 4,
            nome: 'Rotaract Club de Goioerê',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 5,
            nome: 'Rotaract Club de Paranavaí',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 6,
            nome: 'Rotaract Club de Maringa Interação',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 7,
            nome: 'Rotaract Club de Maringá Cidade Canção',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 8,
            nome: 'Rotaract Club de A',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 9,
            nome: 'Rotaract Club de B',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 10,
            nome: 'Rotaract Club de C',
            situacao: 'Ativo'
          }
        ]
      },
      lstUsuario: {
        headers: [
          { text: 'Código', value: 'codigo' },
          { text: 'Nome', value: 'nome' },
          { text: 'Clube', value: 'clube' }
        ],
        items: [
          {
            value: false,
            codigo: 1,
            nome: 'Johny Alves Fabrin',
            clube: {
              codigo: 2,
              nome: 'Rotaract Club de Cianorte'
            },
            login: 'jfabrin',
            tipo: 'Admin',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 2,
            nome: 'Diego Rafael Fachin',
            clube: {
              codigo: 2,
              nome: 'Rotaract Club de Cianorte'
            },
            login: 'jfabrin',
            tipo: 'Admin',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 3,
            nome: 'Paulo Celso de Brito Jr',
            clube: {
              codigo: 4,
              nome: 'Rotaract Club de Goioerê'
            },
            login: 'jfabrin',
            tipo: 'Tesoureiro',
            situacao: 'Ativo'
          }
        ]
      }
    }
  },
  methods: {
    salvar () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        /* axios.post('/api/submit', {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        }) */
      }
    },
    limpar () {
      this.$refs.form.reset()
    },
    selecionarClube (item) {
      this.clubes = false
      this.usuario.clube.codigo = item.codigo
      this.usuario.clube.nome = item.nome
    },
    selecionarUsuario (item) {
      this.usuarios = false
      this.usuario = item
    }
  }
}
</script>

<style>

</style>
