<template>
  <div class="ModalAnexo">
    <v-dialog v-model="modal" width="800px" persistent>
        <v-card>
          <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Lista de Anexo
          </label>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="close(false)" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
              {{mensagem.texto}}
            </v-alert>
            <v-form v-model="valid2" ref="formAnexo" lazy-validation>
              <v-flex xs12>
                <v-text-field label="Descrição" v-model="anexo.descricao" :rules="regrasValidacao.descricao" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field type="file" id="file" label="Anexo"></v-text-field>
              </v-flex>

              <v-btn color="primary" @click="salvarAnexo" :disabled="!valid2 || documento.situacao != 1" :loading="loading">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-form>
            <hr />

            <v-data-table :headers="tblAnexo.headers" :items="tblAnexo.items" hide-actions item-key="name">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarUsuario(props.item)">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.descricao }}</td>
                  <td>
                    <v-btn flat icon color="primary" @click.stop="removerAnexo(props.item.id)" v-show="documento.situacao == 1">
                      <v-icon>clear</v-icon>
                    </v-btn>

                    <v-btn flat icon color="primary" @click.stop="baixarArquivo(props.item.diretorio)">
                      <v-icon>file_download</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalAnexo',
  data () {
    return {
      search: '',
      valid2: true,
      anexo: {
        documento_id: this.documento.id,
        descricao: '',
        arquivo: ''
      },
      regrasValidacao: {
        anexo: [
          v => !!v || 'Anexo é obrigatório'
        ],
        descricao: [
          v => !!v || 'Descrição é obrigatório'
        ]
      },
      tblAnexo: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Descrição', value: 'descricao' },
          { text: 'Opção', value: 'opcao' }
        ],
        items: []
      },
      loading: false,
      mensagem: {
        tipos: '',
        texto: '',
        mostrar: false
      }
    }
  },
  methods: {
    salvarAnexo () {
      let formData = new FormData()
      formData.append('descricao', this.anexo.descricao)
      formData.append('documento_id', this.anexo.documento_id)
      var arquivo = document.querySelector('#file')
      formData.append('arquivo', arquivo.files[0])
      this.loading = true
      this
        .axios
        .post('anexo/uploaddoc', formData, {headers: {'Content-type': 'multipart/form-data'}})
        .then((success) => {
          this.mensagem = {
            tipo: 'success',
            texto: 'Salvo com sucesso!',
            mostrar: true
          }
          this.limpar()
          this.loading = false
          this.buscarAnexo()
        })
        .catch((error) => {
          this.mensagem = {
            tipo: 'error',
            texto: error,
            mostrar: true
          }
          this.loading = false
        })
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
    limpar () {
      this.$refs.formAnexo.reset()
      this.anexos = false
    },
    close (val) {
      this.$emit('anexos', val)
    },
    baixarArquivo (item) {
      window.open('https://sistema.rotaract4630.com.br/Documentos/' + item, '_blank')
    },
    removerAnexo (item) {
      this
        .axios
        .delete('anexo/' + item)
        .then((success) => {
          this.buscarAnexo()
          this.mensagem = {
            tipo: 'info',
            texto: 'Excluído com sucesso!',
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
