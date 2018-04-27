<template>
  <div class="DocumentoCadastro">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <h1>Cadastro de Documento</h1>
          <hr />

          <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
            {{mensagem.texto}}
          </v-alert>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="documento.id" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click.stop="buscarDocumento">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Clube" v-model="documento.clube_id" disabled></v-text-field>
              </v-flex>
              <v-flex xs9 pl-3>
                <v-text-field v-model="documento.clube.nome" disabled></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Tipo Documento" v-model="documento.tipo_documento_id" :rules="regrasValidacao.tipo" disabled></v-text-field>
              </v-flex>
              <v-flex xs8 pl-3>
                <v-text-field v-model="documento.tipo_documento.nome" disabled></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon color="primary" @click.stop="buscarTipoDocumento">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Categoria" v-model="documento.categoria_id" :rules="regrasValidacao.categoria" disabled></v-text-field>
              </v-flex>
              <v-flex xs8 pl-3>
                <v-text-field v-model="documento.categoria.nome" disabled></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon color="primary" @click.stop="buscarCategoria">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs3>
                <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="data_selecao" >
                  <v-text-field slot="activator" label="Mês Referência" v-model="documento.mes_referencia" readonly ></v-text-field>
                  <v-date-picker type="month" v-model="data_selecao" no-title scrollable locale="pt-br">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(data_selecao)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12>
                <v-text-field name="input-1" label="Observação" v-model="documento.observacao" textarea></v-text-field>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid" :loading="loading">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
              <v-btn @click="anexos = true" :disabled="!habilita">Anexos</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <!-- Modal Documento -->
      <ModalDocumento :lstDocumento='lstDocumento' :modal='documentos' v-on:documento="selecionarDocumento" v-on:documentos="closeDocumento" v-if="documentos"></ModalDocumento>

      <!-- Modal Tipo Documento -->
      <ModalTipo :lstTipoDocumento='lstTipoDocumento' :modal='tipoDocumentos' v-on:tipoDocumento="selecionarTipoDocumento" v-on:tipoDocumentos="closeTipoDocumento" v-if="tipoDocumentos"></ModalTipo>

      <!-- Modal Categoria -->
      <ModalCategoria :lstCategoria='lstCategoria' :modal='categorias' v-on:categoria="selecionarCategoria" v-on:categorias="closeCategoria" v-if="categorias"></ModalCategoria>

      <!-- Modal Anexo -->
      <ModalAnexo :documento='documento' :modal='anexos' v-on:anexos="closeAnexo" v-if="anexos"></ModalAnexo>
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'
import ModalTipo from '@/components/ModalTipo'
import ModalCategoria from '@/components/ModalCategoria'
import ModalDocumento from '@/components/ModalDocumento'
import ModalAnexo from '@/components/ModalAnexo'

export default {
  name: 'TipoDocumento',
  components: {
    Cabecalho,
    Rodape,
    ModalTipo,
    ModalCategoria,
    ModalDocumento,
    ModalAnexo
  },
  computed: {
    user () {
      return this.$localStorage.get('user')
    }
  },
  data () {
    return {
      valid: true,
      loading: false,
      documentos: false,
      tipoDocumentos: false,
      categorias: false,
      anexos: false,
      teste: false,
      data_selecao: '',
      menu: false,
      mensagem: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      habilita: false,
      documento: {
        id: '',
        usuario: {
          id: '',
          nome: ''
        },
        clube_id: '',
        clube: {
          id: '',
          nome: ''
        },
        tipo_documento_id: '',
        tipo_documento: {
          id: '',
          nome: ''
        },
        categoria_id: '',
        categoria: {
          id: '',
          nome: ''
        },
        mes_referencia: '',
        observacao: '',
        data_envio: new Date(),
        anexo: '',
        situacao: '1'
      },
      regrasValidacao: {
        categoria: [
          v => !!v || 'Categoria é obrigatório'
        ],
        tipo: [
          v => !!v || 'Tipo de Documento é obrigatório'
        ],
        clube: [
          v => !!v || 'Categoria é obrigatório'
        ],
        mesRef: [
          v => !!v || 'Mês Ref. é obrigatório',
          v => (v && v.substring(0, 2) <= 12) || 'Mês inválido'
        ]
      },
      lstDocumento: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Clube', value: 'clube' },
          { text: 'Categoria', value: 'categoria' },
          { text: 'Mês Ref.', value: 'mesRef' },
          { text: 'Data Envio', value: 'dataEnvio' }
        ],
        items: [],
        erro: {
          tipo: '',
          texto: '',
          mostrar: false
        }
      },
      lstTipoDocumento: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Nome', value: 'nome' }
        ],
        items: [],
        erro: {
          tipo: '',
          texto: '',
          mostrar: false
        }
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
      }
    }
  },
  watch: {
    data_selecao: function (val) {
      var data = val.split('-')
      this.documento.mes_referencia = data[1] + '/' + data[0]
    },
    tipo_documento_id: function () {
      this.mensagem = {
        tipo: '',
        mensagem: '',
        mostrar: false
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
    },
    mesref (val) {
      var data = val.split('-')
      return data[1] + '/' + data[0]
    }
  },
  methods: {
    salvar () {
      let data = this.documento.mes_referencia.split('/')
      this.documento.mes_referencia = data[1] + '-' + data[0] + '-01'
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.documento.id) {
          this
            .axios
            .put('documento/' + this.documento.id, this.documento)
            .then((success) => {
              this.loading = false
              this.mensagem = {
                tipo: 'success',
                texto: 'Salvo com sucesso!',
                mostrar: true
              }
              console.log(success)
              this.getDocumento(success.data.id)
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
          let dia = new Date().getDate()
          let mes = new Date().getMonth() + 1
          let ano = new Date().getFullYear()
          this.documento.data_envio = ano + '-' + mes + '-' + dia
          this
            .axios
            .post('documento', this.documento)
            .then((success) => {
              this.loading = false
              this.mensagem = {
                tipo: 'success',
                texto: 'Salvo com sucesso!',
                mostrar: true
              }
              this.getDocumento(success.data.id)
              this.anexos = true
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
    selecionarDocumento (item) {
      this.habilita = true
      this.getDocumento(item.id)
      this.documentos = false
    },
    selecionarTipoDocumento (item) {
      this.documento.tipo_documento_id = item.id
      this.documento.tipo_documento = item
      this.tipoDocumentos = false
    },
    selecionarCategoria (item) {
      this.categorias = false
      this.documento.categoria_id = item.id
      this.documento.categoria = item
    },
    closeDocumento (val) {
      this.documentos = val
    },
    closeTipoDocumento (val) {
      this.tipoDocumentos = val
    },
    closeCategoria (val) {
      this.categorias = val
    },
    closeAnexo (val) {
      this.anexos = val
    },
    limpar () {
      this.$refs.form.reset()
      this.habilita = false
      this.anexos = false
      this.carregaDados()
    },
    buscarDocumento () {
      this
        .axios
        .get('documento')
        .then((retorno) => {
          let lstItems = []
          for (var item in retorno.data.data) {
            if (retorno.data.data[item].id) {
              let registro = retorno.data.data[item]
              lstItems.push(registro)
            }
          }
          this.lstDocumento.items = lstItems
          this.lstDocumento.erro = { mostrar: false, texto: '', type: '' }
          this.documentos = true
        })
        .catch((error) => {
          this.lstDocumento.erro = { mostrar: true, texto: error, type: 'error' }
        })
    },
    buscarTipoDocumento () {
      this
        .axios
        .get('tipodocumento?situacao=1')
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
          this.lstTipoDocumento.erro = { mostrar: true, texto: error, type: 'error' }
        })
    },
    buscarCategoria () {
      this
        .axios
        .get('categoria?situacao=1')
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
    },
    carregaDados () {
      this.documento.clube_id = this.user.clube.id
      this.documento.clube = this.user.clube
      this.documento.usuario_id = this.user.id
      this.documento.usuario.id = this.user.id
      this.documento.usuario.nome = this.user.nome
    },
    getDocumento (id) {
      this
        .axios
        .get('documento?id=' + id)
        .then((success) => {
          console.log(success.data.data[0])
          this.documento = success.data.data[0]
          let mesRef = success.data.data[0].mes_referencia.split('-')
          this.documento.mes_referencia = mesRef[1] + '/' + mesRef[0]
        })
        .catch((error) => {
          this.mensagem = {
            tipo: 'error',
            texto: error,
            mostrar: true
          }
        })
    }
  },
  mounted () {
    this.carregaDados()
  }
}
</script>

<style>

</style>
