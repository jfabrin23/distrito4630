<template>
  <div class="ModalVisualizador">
    <v-dialog v-model="modal" width="800px" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Visualizador de Documentos
          </label>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="close(false)" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs6>
              <label>
                <small>Documento:</small><br />
                <strong>{{ documento.id }}</strong>
              </label><br />
              <label>
                <small>Clube:</small><br />
                <strong>{{ documento.clube.nome }}</strong>
              </label><br />
              <label>
                <small>Mês Ref.:</small><br />
                <strong>{{ documento.mes_referencia | mesref }}</strong>
              </label>
            </v-flex>
            <v-flex xs6>
              <label>
                <small>Tipo de Documento:</small><br />
                <strong>{{ documento.tipo_documento.nome }}</strong>
              </label><br />
              <label>
                <small>Categoria:</small><br />
                <strong>{{ documento.categoria.nome }}</strong>
              </label><br />
              <label>
                <small>Situação:</small><br />
                <strong>{{ documento.situacao | situacao }}</strong>
              </label>
            </v-flex>
          </v-layout>
          <br />
          <v-layout row wrap>
            <v-flex xs12 text-xs-justify>
              <small>Observação</small> <br />
              <p text-xs-justify>
                {{ documento.observacao }}
              </p>
            </v-flex>
          </v-layout>
          <v-layout mb-2>
            <v-flex xs12 text-xs-right>
              <small>POR: <strong>{{ documento.usuario.nome }} | {{ documento.data_envio | data}}</strong></small>
            </v-flex>
          </v-layout>

          <hr />

          <v-data-table :headers="tblAnexo.headers" :items="tblAnexo.items" hide-actions item-key="name">
            <template slot="items" slot-scope="props">
              <tr @click="selecionarUsuario(props.item)">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.descricao }}</td>
                <td>
                  <v-btn flat icon color="primary" @click.stop="baixarArquivo(props.item.diretorio)">
                    <v-icon>file_download</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
        <v-card-actions v-if="user.tipo === '1'">
          <v-layout row wrap>
            <v-flex xs12>
              <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
                {{mensagem.texto}}
              </v-alert>
            </v-flex>
            <v-flex xs12>
              <v-btn color="primary" :disabled="this.documento.situacao !== '2'" @click="alterarSituacao('3')" :loading="loadingSituacao">Aprovar</v-btn>
              <v-btn flat :disabled="this.documento.situacao !== '2'" @click="alterarSituacao('4')" :loading="loadingSituacao">Recusar</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalVisualizador',
  computed: {
    user () {
      return this.$localStorage.get('user')
    }
  },
  data () {
    return {
      tblAnexo: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Descrição', value: 'descricao' },
          { text: 'Opção', value: 'opcao' }
        ],
        items: []
      },
      loadingSituacao: false,
      mensagem: {
        tipos: '',
        texto: '',
        mostrar: false
      }
    }
  },
  filters: {
    data (val) {
      var data = val.split('-')
      return data[2] + '/' + data[1] + '/' + data[0]
    },
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
    alterarSituacao (situacao) {
      this.loadingSituacao = true
      if (this.documento.id) {
        this
          .axios
          .put('documento/' + this.documento.id, {'situacao': situacao})
          .then((success) => {
            this.loadingSituacao = false
            this.mensagem = {
              tipo: 'success',
              texto: 'Enviado com sucesso!',
              mostrar: true
            }
          })
          .catch((error) => {
            this.loadingSituacao = false
            this.mensagem = {
              tipo: 'error',
              texto: error,
              mostrar: true
            }
          })
      }
    },
    baixarArquivo (item) {
      window.open('https://sistema.rotaract4630.com.br/Documentos/' + item, '_blank')
    },
    buscarAnexo () {
      this
        .axios
        .get('anexo?documento_id=' + this.documento.id)
        .then((success) => {
          let lstItems = []
          for (var item in success.data.data) {
            if (success.data.data[item].id) {
              let registro = success.data.data[item]
              lstItems.push(registro)
            }
          }
          this.tblAnexo.items = lstItems
        })
        .catch((error) => {
          this.mensagem = {
            tipo: 'error',
            texto: error,
            mostrar: true
          }
        })
    },
    close (val) {
      console.log('1')
      this.$emit('visualizar', val)
    }
  },
  mounted () {
    this.buscarAnexo()
  },
  props: [
    'documento',
    'modal'
  ]
}
</script>

<style>

</style>
