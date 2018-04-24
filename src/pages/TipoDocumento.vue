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

              <!-- <v-flex xs12>
                <v-checkbox label="Mês Ref." v-model="tipoDocumento.mesRef"></v-checkbox>
              </v-flex> -->

              <v-btn color="primary" @click="salvar" :disabled="!valid" :loading="loading">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <!-- Modal Tipo Documento -->
      <ModalTipo :lstTipoDocumento='lstTipoDocumento' :modal='tipoDocumentos' v-on:tipoDocumento="selecionarTipoDocumento" v-on:tipoDocumentos="closeTipoDocumento" v-if="tipoDocumentos"></ModalTipo>
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'
import ModalTipo from '@/components/ModalTipo'

export default {
  name: 'TipoDocumento',
  components: {
    Cabecalho,
    Rodape,
    ModalTipo
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
        this.loading = true
        if (this.tipoDocumento.id) {
          this
            .axios
            .put('tipodocumento/' + this.tipoDocumento.id, this.tipoDocumento)
            .then((success) => {
              this.loading = false
              this.limpar()
              this.mensagem = {
                tipo: 'success',
                texto: 'Salvo com sucesso!',
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
          this
            .axios
            .post('tipodocumento', this.tipoDocumento)
            .then((success) => {
              this.loading = false
              this.limpar()
              this.mensagem = {
                tipo: 'success',
                texto: 'Salvo com sucesso!',
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
    selecionarTipoDocumento (item) {
      this.tipoDocumento = item
      this.tipoDocumentos = false
    },
    closeTipoDocumento (val) {
      this.tipoDocumentos = val
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
