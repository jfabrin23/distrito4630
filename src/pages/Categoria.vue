<template>
  <div class="Categoria">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <h1>Cadastro de Categoria</h1>
          <hr />

          <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
            {{mensagem.texto}}
          </v-alert>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="categoria.id" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click="buscarCategoria">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Nome" v-model="categoria.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-select label="Situação" v-model="categoria.situacao" :items="cbb.situacao" :rules="regrasValidacao.situacao" required autocomplete></v-select>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <v-dialog v-model="categorias" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Categorias
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Buscar" v-model="searchCategoria"></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="lstCategoria.headers" :items="lstCategoria.items" hide-actions item-key="name" :search="searchCategoria" v-if="!lstCategoria.erro.mostrar">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarCategoria(props.item)">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.situacao | situacao }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-alert :type="lstCategoria.erro.tipo" :value="true" v-if="lstCategoria.erro.mostrar">
              {{lstCategoria.error.texto}}
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
  name: 'Categoria',
  components: {
    Cabecalho,
    Rodape
  },
  data () {
    return {
      valid: true,
      categorias: false,
      searchCategoria: '',
      mensagem: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      categoria: {
        id: '',
        nome: '',
        situacao: null
      },
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
        ],
        situacao: [
          v => !!v || 'Situação é obrigatório'
        ]
      },
      lstCategoria: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Nome', value: 'nome' },
          { text: 'Situação', value: 'situacao' }
        ],
        items: [],
        erro: {
          tipo: '',
          texto: '',
          mostrar: false
        }
      },
      cbb: {
        situacao: [
          { value: '1', text: 'Ativo' },
          { value: '0', text: 'Inativo' }
        ]
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
        if (this.categoria.id) {
          this
            .axios
            .put('categoria/' + this.categoria.id, this.categoria)
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
            .post('categoria', this.categoria)
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
    },
    selecionarCategoria (item) {
      this.categorias = false
      this.categoria = item
    },
    buscarCategoria () {
      this
        .axios
        .get('categoria')
        .then((retorno) => {
          let lstItems = []
          for (var item in retorno.data.data) {
            if (retorno.data.data[item].id) {
              let registro = retorno.data.data[item]
              lstItems.push(registro)
            }
          }

          this.lstCategoria.items = lstItems
          this.lstCategoria.erro = { mostrar: false, texto: '', type: '' }
          this.categorias = true
        })
        .catch((error) => {
          this.lstCategoria.erro = { mostrar: true, texto: error, type: 'error' }
        })
    }
  }
}
</script>

<style>

</style>
