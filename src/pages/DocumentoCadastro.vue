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
                <v-btn flat icon color="primary" @click.stop="documentos = !documentos">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Clube" v-model="documento.clube.id" :rules="regrasValidacao.clube" disabled></v-text-field>
              </v-flex>
              <v-flex xs9 pl-3>
                <v-text-field v-model="documento.clube.nome" disabled></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Tipo Documento" v-model="documento.tipoDocumento_id" :rules="regrasValidacao.tipo" disabled></v-text-field>
              </v-flex>
              <v-flex xs8 pl-3>
                <v-text-field v-model="documento.tipoDocumento.nome" disabled></v-text-field>
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
                <v-text-field label="Mês Rêf." v-model="documento.mesRef" :mask="mask"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field name="input-1" label="Observação" v-model="documento.observacao" textarea></v-text-field>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
              <v-btn @click="anexos = !anexos">Anexos</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <v-dialog v-model="documentos" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Documentos
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-data-table :headers="lstDocumentos.headers" :items="lstDocumentos.items" hide-actions item-key="name">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarDocumento(props.item)">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.clube.nome }}</td>
                  <td>{{ props.item.categoria }}</td>
                  <td>{{ props.item.mesRef }}</td>
                  <td>{{ props.item.dataEnvio }}</td>
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
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Buscar" v-model="searchTipoDocumento"></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="lstTipoDocumento.headers" :items="lstTipoDocumento.items" hide-actions item-key="name" :search="searchTipoDocumento" v-if="!lstTipoDocumento.erro.mostrar">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarTipoDocumento(props.item)">
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

      <v-dialog v-model="categorias" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Categorias
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Buscar" v-model="searchCategoria"></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="lstCategoria.headers" :items="lstCategoria.items" hide-actions item-key="name" :search="searchCategoria" v-if="!lstCategoria.erro.mostrar">
              <template slot="items" slot-scope="props">
                <tr @click="selecionarCategoria(props.item)">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.situacao | situacao }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-alert :type="lstCategoria.erro.tipo" :value="true" v-if="lstCategoria.erro.mostrar">
              {{lstCategoria.error.texto}}
            </v-alert>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="anexos" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Cadastro de Anexos
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-form v-model="valid2" ref="formAnexo" lazy-validation>
              <v-flex xs12>
                <v-text-field label="Descrição" v-model="anexo.descricao" :rules="regrasValidacao.descricao" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field type="file" label="Anexo" v-model="anexo.arquivo" :rules="regrasValidacao.anexo" required></v-text-field>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-form>
            <hr />

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
      valid2: true,
      searchTipoDocumento: '',
      searchCategoria: '',
      mensagem: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      documentos: false,
      tipoDocumentos: false,
      categorias: false,
      anexos: false,
      habilita: false,
      mask: '##/####',
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
        tipoDocumento_id: '',
        tipoDocumento: {
          id: '',
          nome: ''
        },
        categoria_id: '',
        categoria: {
          id: '',
          nome: ''
        },
        mefRef: '',
        observacao: '',
        dataEnvio: new Date(),
        anexo: ''
      },
      anexo: {
        numero: '',
        descricao: '',
        arquivo: ''
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
        ],
        anexo: [
          v => !!v || 'Anexo é obrigatório'
        ],
        descricao: [
          v => !!v || 'Descrição é obrigatório'
        ]
      },
      lstDocumentos: {
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
    selecionarDocumento (item) {
      this.habilita = true
      this.documentos = false
      this.documento = item
    },
    selecionarTipoDocumento (item) {
      this.tipoDocumentos = false
      this.documento.tipoDocumento_id = item.id
      this.documento.tipoDocumento = item
    },
    selecionarCategoria (item) {
      this.categorias = false
      this.documento.categoria_id = item.id
      this.documento.categoria = item
    },
    limpar () {
      this.desabilita = false
      this.$refs.form.reset()
    },
    removeCategoria (item) {
      this.filtro.categoria.splice(this.filtro.categoria.indexOf(item), 1)
      this.filtro.categoria = [this.filtro.categoria]
    },
    removeTipoDocumento (item) {
      this.filtro.tipoDocumento.splice(this.filtro.tipoDocumento.indexOf(item), 1)
      this.filtro.tipoDocumento = [this.filtro.tipoDocumento]
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
    },
    buscarCategoria () {
      this
        .axios
        .get('categoria')
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
    }
  }
}
</script>

<style>

</style>
