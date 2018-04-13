<template>
  <div class="TipoDocumento">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <h1>Cadastro de Tipo de Documento</h1>
          <hr />

          <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
            {{mensagem.texto}}
          </v-alert>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="tipoDocumento.id" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click.stop="buscarTipoDocumento">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Nome" v-model="tipoDocumento.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-checkbox label="Mês Ref." v-model="tipoDocumento.mesRef"></v-checkbox>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <v-dialog v-model="tipoDocumentos" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Tipo de Documentos
          </v-card-title>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Buscar" v-model="search"></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="lstTipoDocumento.headers" :items="lstTipoDocumento.items" hide-actions item-key="name" :search="search" v-if="!lstTipoDocumento.erro.mostrar">
              <template slot="items" slot-scope="props">
                <tr @click="selecionar(props.item)">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.nome }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-alert :type="lstTipoDocumento.erro.tipo" :value="true" v-if="lstTipoDocumento.erro.mostrar">
              {{lstTipoDocumento.error.texto}}
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
  name: 'TipoDocumento',
  components: {
    Cabecalho,
    Rodape
  },
  data () {
    return {
      valid: true,
      search: '',
      mensagem: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      tipoDocumentos: false,
      tipoDocumento: {
        id: '',
        nome: '',
        mesRef: false
      },
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
        ]
      },
      lstTipoDocumento: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Nome', value: 'nome' }
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
    salvar () {
      if (this.$refs.form.validate()) {
        if (this.tipoDocumento.id) {
          this
            .axios
            .put('tipodocumento/' + this.tipoDocumento.id, this.tipoDocumento)
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
            .post('tipodocumento', this.tipoDocumento)
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
      this.tipoDocumentos = false
      this.tipoDocumento = item
    },
    buscarTipoDocumento () {
      this
        .axios
        .get('tipodocumento')
        .then((retorno) => {
          let lstItems = []
          for (var item in retorno.data.data) {
            if (retorno.data.data[item].id) {
              let registro = retorno.data.data[item]
              lstItems.push(registro)
            }
          }

          this.lstTipoDocumento.items = lstItems
          this.lstTipoDocumento.erro = { mostrar: false, texto: '', type: '' }
          this.tipoDocumentos = true
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
