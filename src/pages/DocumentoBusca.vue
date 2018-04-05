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
                    <v-select v-model="filtro.categoria" label="Categoria" chips tags :items="cbb.categoria">
                      <template slot="selection" slot-scope="data">
                        <v-chip close @input="removeCategoria(data.item)" :selected="data.selected" >
                          <strong>{{ data.item }}</strong>&nbsp;
                        </v-chip>
                      </template>
                    </v-select>
                  </v-flex>

                  <v-flex xs12>
                    <v-select v-model="filtro.tipoDocumento" label="Tipo de Documento" chips tags :items="cbb.tipoDocumento">
                      <template slot="selection" slot-scope="data">
                        <v-chip close @input="removeTipoDocumento(data.item)" :selected="data.selected" >
                          <strong>{{ data.item }}</strong>&nbsp;
                        </v-chip>
                      </template>
                    </v-select>
                  </v-flex>

                  <v-btn color="primary" @click="buscar">Buscar</v-btn>
                  <v-btn @click="limpar">Limpar</v-btn>
                </v-layout>
              </v-form>
            </v-container>
          </v-card>

          <v-data-table :headers="tblResultado.headers" :items="tblResultado.items" hide-actions item-key="name" v-if="tabela">
            <template slot="items" slot-scope="props">
              <tr @click="selecionarUsuario(props.item)">
                <td>{{ props.item.codigo }}</td>
                <td>{{ props.item.tipodocumento.nome }}</td>
                <td>{{ props.item.categoria.nome }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
      </v-content>

      <Rodape />
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'

export default {
  name: 'DocumentoBusca',
  components: {
    Cabecalho,
    Rodape
  },
  data () {
    return {
      valid: true,
      tabela: false,
      filtro: {
        tipoDocumento: [],
        categoria: []
      },
      cbb: {
        tipoDocumento: [ 'Secretaria', 'Tesouraria', 'Projetos' ],
        categoria: [ 'Secretaria', 'Tesouraria', 'Internos', 'Internacionais' ]
      },
      tblResultado: {
        headers: [
          { text: 'Código', value: 'codigo' },
          { text: 'Tipo Documento', value: 'tipodocumento' },
          { text: 'Categoria', value: 'categoria' }
        ],
        items: [
          {
            value: false,
            codigo: 1,
            tipodocumento: {
              codigo: 1,
              nome: 'Secretaria'
            },
            categoria: {
              codigo: 1,
              nome: 'Secretaria'
            }
          },
          {
            value: false,
            codigo: 1,
            tipodocumento: {
              codigo: 1,
              nome: 'Secretaria'
            },
            categoria: {
              codigo: 1,
              nome: 'Secretaria'
            }
          }
        ]
      }
    }
  },
  methods: {
    buscar () {
      this.tabela = true
    },
    limpar () {
      this.tabela = false
      this.$refs.form.reset()
    },
    removeCategoria (item) {
      this.filtro.categoria.splice(this.filtro.categoria.indexOf(item), 1)
      this.filtro.categoria = [this.filtro.categoria]
    },
    removeTipoDocumento (item) {
      this.filtro.tipoDocumento.splice(this.filtro.tipoDocumento.indexOf(item), 1)
      this.filtro.tipoDocumento = [this.filtro.tipoDocumento]
    }
  }
}
</script>

<style>

</style>
