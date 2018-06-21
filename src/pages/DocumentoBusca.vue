<template>
  <div class="DocumentoBusca">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <h1>Consulta de Documentos</h1>
          <hr />

          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
              Filtro
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-select label="Categoria" :items="cbb.categoria" v-model="filtro.categoria" item-text="name" item-value="value" multiple chips max-height="auto" autocomplete>
                      <template slot="selection" slot-scope="data">
                        <v-chip close @input="data.parent.selectItem(data.item)" :selected="data.selected" class="chip--select-multi" :key="JSON.stringify(data.item)">
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template slot="item" slot-scope="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-select>
                  </v-flex>

                  <v-flex xs12>
                    <v-select label="Tipo Documento" :items="cbb.tipoDocumento" v-model="filtro.tipoDocumento" item-text="name" item-value="value" multiple chips max-height="auto" autocomplete>
                      <template slot="selection" slot-scope="data">
                        <v-chip close @input="data.parent.selectItem(data.item)" :selected="data.selected" class="chip--select-multi" :key="JSON.stringify(data.item)">
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template slot="item" slot-scope="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-select>
                  </v-flex>

                  <v-flex xs3>
                    <v-text-field label="Clube" v-model="filtro.clube.id" disabled></v-text-field>
                  </v-flex>
                  <v-flex xs8 pl-3>
                    <v-text-field v-model="filtro.clube.nome" disabled></v-text-field>
                  </v-flex>
                  <v-flex xs1 v-show="this.user.tipo === '1'">
                    <v-btn flat icon color="primary" @click="buscarClube">
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>

                  <v-btn color="primary" @click="buscar">Buscar</v-btn>
                  <v-btn @click="limpar">Limpar</v-btn>
                </v-layout>
              </v-form>
            </v-container>
          </v-card>

          <v-data-table :headers="tblResultado.headers" :items="tblResultado.items" hide-actions item-key="name" v-if="tabelas">
            <template slot="items" slot-scope="props">
              <tr @click="selecionarUsuario(props.item)">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.clube.nome }}</td>
                <td>{{ props.item.tipodocumento.nome }}</td>
                <td>{{ props.item.categoria.nome }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
      </v-content>

      <!-- Modal Clube -->
      <ModalClube :lstClube='lstClube' :modal='clubes' v-on:clube="selecionarClube" v-on:clubes="closeClube" v-if="clubes"></ModalClube>

      <Rodape />
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'
import ModalClube from '@/components/ModalClube'

export default {
  name: 'DocumentoBusca',
  components: {
    Cabecalho,
    Rodape,
    ModalClube
  },
  computed: {
    user () {
      return this.$localStorage.get('user')
    }
  },
  data () {
    return {
      clubes: false,
      valid: true,
      tabelas: false,
      filtro: {
        tipoDocumento: [],
        categoria: [],
        clube: {
          id: '',
          nome: ''
        }
      },
      cbb: {
        tipoDocumento: [],
        categoria: [],
        clube: []
      },
      tblResultado: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Clube', value: 'clube' },
          { text: 'Tipo Documento', value: 'tipodocumento' },
          { text: 'Categoria', value: 'categoria' }
        ],
        items: [],
        mensagem: {
          tipo: '',
          mensagem: '',
          mostrar: false
        }
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
  methods: {
    buscar () {
      this
        .axios
        .get('documento', this.filtro)
        .then((success) => {
          let lstItem = []
          for (var item in success.data.data) {
            if (success.data.data[item]) {
              let registro = {
                id: success.data.data[item].id,
                clube: success.data.data[item].clube,
                tipodocumento: success.data.data[item].tipo_documento,
                categoria: success.data.data[item].categoria
              }
              lstItem.push(registro)
            }
          }
          this.tblResultado.items = lstItem
          this.tabelas = true
        })
        .catch((error) => {
          this.tblResultado.mensagem = {
            tipo: 'error',
            texto: error,
            mostrar: true
          }
        })
    },
    buscarClube () {
      this
        .axios
        .get('clube')
        .then((retorno) => {
          let lstItems = []
          for (var item in retorno.data.data) {
            if (retorno.data.data[item].id) {
              let registro = retorno.data.data[item]
              lstItems.push(registro)
            }
          }

          this.lstClube.items = lstItems
          this.lstClube.erro = { mostrar: false, texto: '', type: '' }
          this.clubes = true
        })
        .catch((error) => {
          this.lstClube.erro = { mostrar: true, texto: error, type: 'error' }
        })
    },
    limpar () {
      this.tabela = false
      this.$refs.form.reset()
    },
    getTipoDocumento () {
      this
        .axios
        .get('tipodocumento?situacao=1')
        .then((success) => {
          let lstItems = []
          for (var item in success.data.data) {
            if (success.data.data[item].id) {
              let registro = {
                value: success.data.data[item].id,
                name: success.data.data[item].nome
              }
              lstItems.push(registro)
            }
          }
          this.cbb.tipoDocumento = lstItems
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCategoria () {
      this
        .axios
        .get('categoria?situacao=1')
        .then((success) => {
          let lstItems = []
          for (var item in success.data.data) {
            if (success.data.data[item].id) {
              let registro = {
                value: success.data.data[item].id,
                name: success.data.data[item].nome
              }
              lstItems.push(registro)
            }
          }
          this.cbb.categoria = lstItems
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getClube () {
      this.filtro.clube = this.user.clube
    },
    selecionarClube (item) {
      this.filtro.clube = item
      this.clubes = false
      this.btnExcluir = false
    }
  },
  mounted () {
    this.getTipoDocumento()
    this.getCategoria()
    this.getClube()
  }
}
</script>

<style>

</style>
