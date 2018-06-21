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
            <v-form v-model="valid2" ref="formAnexo" lazy-validation>
              <v-flex xs12>
                <v-text-field label="Descrição" v-model="anexo.descricao" :rules="regrasValidacao.descricao" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field type="file" id="file" label="Anexo" v-model="anexo.arquivo" v-on:change="handleFileUpload()"></v-text-field>
              </v-flex>

              <v-btn color="primary" @click="salvarAnexo" :disabled="!valid2">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-form>
            <hr />

            {{ anexo }}

            <v-data-table :headers="tblAnexo.headers" :items="tblAnexo.items" hide-actions item-key="name">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarUsuario(props.item)">
                  <td>{{ props.item.numero }}</td>
                  <td>{{ props.item.descricao }}</td>
                  <td>
                    <v-btn flat icon color="primary" @click.stop="deleteAnexo(item)">
                      <v-icon>clear</v-icon>
                    </v-btn>

                    <v-btn flat icon color="primary" @click.stop="deleteAnexo(item)">
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
      }
    }
  },
  methods: {
    handleFileUpload () {
      this.anexo.arquivo = this.$refs.file.files[0]
    },
    selecionar (item) {
      this.$emit('tipoDocumento', item)
    },
    salvarAnexo () {
      let formData = new FormData()
      formData.append('documento_id', this.anexo.documento_id)
      formData.append('descricao', this.anexo.descricao)
      formData.append('arquivo', this.anexo.arquivo)
      this
        .axios
        .post('anexo/', formData)
        .then((success) => {
          this.mensagem = {
            tipo: 'success',
            texto: 'Salvo com sucesso!',
            mostrar: true
          }
          this.buscarAnexo()
        })
        .catch((error) => {
          this.mensagem = {
            tipo: 'error',
            texto: error,
            mostrar: true
          }
        })
    },
    buscarAnexo () {
      this
        .axios
        .get('anexo?documento_id=' + this.documento.id)
        .then((success) => {
          this.lstAnexo = success.data.data[0]
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
