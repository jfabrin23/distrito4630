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
              <tr>
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.mes_referencia | mesref }}</td>
                <td>{{ props.item.clube.nome }}</td>
                <td>{{ props.item.tipo_documento.nome }}</td>
                <td>{{ props.item.categoria.nome }}</td>
                <td>{{ props.item.situacao | situacao }}</td>
                <td>
                  <v-btn flat icon color="primary" @click="visualizarItem(props.item)"><v-icon>search</v-icon></v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
      </v-content>

      <!-- Modal Clube -->
      <ModalClube :lstClube='lstClube' :modal='clubes' v-on:clube="selecionarClube" v-on:clubes="closeClube" v-if="clubes"></ModalClube>

      <!-- Modal Visualizador -->
      <ModalVisualizador :documento='documentoVisualizar' :modal='visualizar' v-on:visualizar="closeVisualizar" v-if="visualizar"></ModalVisualizador>
      <Rodape />
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'
import ModalClube from '@/components/ModalClube'
import ModalVisualizador from '@/components/ModalVisualizador'

export default {
  name: 'DocumentoBusca',
  components: {
    Cabecalho,
    Rodape,
    ModalClube,
    ModalVisualizador
  },
  computed: {
    user () {
      return this.$localStorage.get('user')
    },
    clube () {
      return this.$localStorage.get('user.clube')
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
          { text: 'Mês Ref', value: 'mes_referencia' },
          { text: 'Clube', value: 'clube' },
          { text: 'Tipo Documento', value: 'tipodocumento' },
          { text: 'Categoria', value: 'categoria' },
          { text: 'Situação', value: 'situacao' },
          { text: '', value: 'opcao' }
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
      },
      visualizar: false,
      documentoVisualizar: []
    }
  },
  filters: {
    mesref (val) {
      var data = val.split('-')
      return data[1] + '/' + data[0]
    },
    situacao (val) {
      let situacao = 'Indefinido'
      switch (val) {
        case '1':
          situacao = 'Em Rascunho'
          break
        case '2':
          situacao = 'Enviado Representação'
          break
        case '3':
          situacao = 'Aprovado'
          break
        case '4':
          situacao = 'Recusado'
          break
      }

      return situacao
    }
  },
  methods: {
    buscar () {
      let filtroCategoria = 'categoria_id='
      if (this.filtro.categoria) {
        for (var cat in this.filtro.categoria) {
          if (cat > 0) {
            filtroCategoria += ','
          }
          filtroCategoria += this.filtro.categoria[cat]
        }
      }

      let filtroTipoDocumento = 'tipo_documento_id='
      if (this.filtro.tipoDocumento) {
        for (var tpDoc in this.filtro.tipoDocumento) {
          if (cat > 0) {
            filtroTipoDocumento += ','
          }
          filtroTipoDocumento += this.filtro.tipoDocumento[tpDoc]
        }
      }
      let filtroClube = 'clube_id='
      if (this.filtro.clube.id > 0) {
        filtroClube += this.filtro.clube.id
      }

      this
        .axios
        .get('documento?' + filtroCategoria + '&' + filtroTipoDocumento + '&' + filtroClube + '&situacao=2,3')
        .then((success) => {
          let lstItem = []
          for (var item in success.data.data) {
            if (success.data.data[item]) {
              let registro = success.data.data[item]
              lstItem.push(registro)
            }
          }
          console.log(lstItem)
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
    closeVisualizar (val) {
      console.log('2')
      this.visualizar = val
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
    limpar () {
      this.tabelas = false
      this.$refs.form.reset()
    },
    selecionarClube (item) {
      this.filtro.clube = item
      this.clubes = false
      this.btnExcluir = false
    },
    visualizarItem (item) {
      console.log(item)
      this.documentoVisualizar = item
      this.visualizar = true
    }
  },
  mounted () {
    this.getTipoDocumento()
    this.getCategoria()
    if (this.user.tipo !== '1') this.getClube()
  }
}
</script>

<style>

</style>
