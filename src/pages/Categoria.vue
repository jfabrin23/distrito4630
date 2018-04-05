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

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="categoria.codigo" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click.stop="categorias = !categorias">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Name" v-model="categoria.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Tipo de Documento" v-model="categoria.tipoDocumento.codigo" :rules="regrasValidacao.tipoDocumento" disabled></v-text-field>
              </v-flex>
              <v-flex xs8 pl-3>
                <v-text-field v-model="categoria.tipoDocumento.nome" disabled></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon color="primary" @click.stop="tipoDocumentos = !tipoDocumentos">
                  <v-icon>search</v-icon>
                </v-btn>
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
            <v-data-table :headers="lstCategoria.headers" :items="lstCategoria.items" hide-actions item-key="name">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarCategoria(props.item)">
                  <td>{{ props.item.codigo }}</td>
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.situacao }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="tipoDocumentos" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Tipo de Documentos
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-data-table :headers="lstTipoDocumento.headers" :items="lstTipoDocumento.items" hide-actions item-key="name">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarTipoDocumento(props.item)">
                  <td>{{ props.item.codigo }}</td>
                  <td>{{ props.item.nome }}</td>
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
  name: 'Categoria',
  components: {
    Cabecalho,
    Rodape
  },
  data () {
    return {
      valid: true,
      categorias: false,
      tipoDocumentos: false,
      categoria: {
        codigo: '',
        nome: '',
        tipoDocumento: {
          codigo: '',
          nome: ''
        },
        situacao: null
      },
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
        ],
        tipoDocumento: [
          v => !!v || 'Tipo de Documento é obrigatório'
        ],
        situacao: [
          v => !!v || 'Situação é obrigatório'
        ]
      },
      lstTipoDocumento: {
        headers: [
          { text: 'Código', value: 'codigo' },
          { text: 'Nome', value: 'nome' }
        ],
        items: [
          {
            value: false,
            codigo: 1,
            nome: 'Secretaria'
          },
          {
            value: false,
            codigo: 2,
            nome: 'Tesouraria'
          },
          {
            value: false,
            codigo: 3,
            nome: 'Projetos'
          }
        ]
      },
      lstCategoria: {
        headers: [
          { text: 'Código', value: 'codigo' },
          { text: 'Nome', value: 'nome' },
          { text: 'Situação', value: 'situacao' }
        ],
        items: [
          {
            value: false,
            codigo: 1,
            nome: 'Secretaria',
            tipoDocumento: {
              codigo: '1',
              nome: 'Secretaria'
            },
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 2,
            nome: 'Tesouraria',
            tipoDocumento: {
              codigo: '2',
              nome: 'Tesouraria'
            },
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 3,
            nome: 'Internos',
            tipoDocumento: {
              codigo: '3',
              nome: 'Projetos'
            },
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 4,
            nome: 'Comunidade',
            tipoDocumento: {
              codigo: '3',
              nome: 'Projetos'
            },
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 5,
            nome: 'Profissionais',
            tipoDocumento: {
              codigo: '3',
              nome: 'Projetos'
            },
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 6,
            nome: 'Internacionais',
            tipoDocumento: {
              codigo: '3',
              nome: 'Projetos'
            },
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 7,
            nome: 'Imagem Pública',
            tipoDocumento: {
              codigo: '3',
              nome: 'Projetos'
            },
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 8,
            nome: 'Demais Comissões',
            tipoDocumento: {
              codigo: '3',
              nome: 'Projetos'
            },
            situacao: 'Ativo'
          }
        ]
      },
      cbb: {
        situacao: [
          'Ativo',
          'Inativo'
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
    selecionarTipoDocumento (item) {
      this.tipoDocumentos = false
      this.categoria.tipoDocumento = item
    },
    selecionarCategoria (item) {
      this.categorias = false
      this.categoria = item
    }
  }
}
</script>

<style>

</style>
