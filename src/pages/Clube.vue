<template>
  <div class="Clube">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <h1>Cadastro de Clube</h1>
          <hr />

          <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
            {{mensagem.texto}}
          </v-alert>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="clube.id" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click="buscarClube">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Nome" v-model="clube.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select label="Situação" v-model="clube.situacao" :items="cbb.situacao" :rules="regrasValidacao.situacao" required autocomplete></v-select>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <!-- Modal Clube -->
      <v-dialog v-model="clubes" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Clubes
          </v-card-title>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Buscar" v-model="search"></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="lstClube.headers" :items="lstClube.items" :search="search" hide-actions item-key="id" v-if="!lstClube.erro.mostrar">
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
  name: 'Clube',
  components: {
    Cabecalho,
    Rodape
  },
  data () {
    return {
      valid: true,
      search: '',
      clubes: false,
      mensagem: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      clube: {
        id: '',
        nome: '',
        situacao: null
      },
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
        ],
        situacao: [
          v => (v != null) || 'Situação é obrigatório'
        ]
      },
      cbb: {
        situacao: [
          {value: '1', text: 'Ativo'},
          {value: '0', text: 'Inativo'}
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
        if (this.clube.id) {
          this
            .axios
            .put('clube/' + this.clube.id, this.clube)
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
            .post('clube', this.clube)
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
    selecionar (item) {
      this.clubes = false
      this.clube = item
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
    }
  }
}
</script>

<style>

</style>
