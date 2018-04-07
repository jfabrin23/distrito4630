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

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="documento.codigo" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click.stop="documentos = !documentos">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Clube" v-model="documento.clube.codigo" :rules="regrasValidacao.clube" disabled></v-text-field>
              </v-flex>
              <v-flex xs9 pl-3>
                <v-text-field v-model="documento.clube.nome" disabled></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Tipo Documento" v-model="documento.tipo.codigo" :rules="regrasValidacao.tipo" disabled></v-text-field>
              </v-flex>
              <v-flex xs8 pl-3>
                <v-text-field v-model="documento.tipo.nome" disabled></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon color="primary" @click.stop="tipos = !tipos">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs3>
                <v-text-field label="Categoria" v-model="documento.categoria.codigo" :rules="regrasValidacao.categoria" disabled></v-text-field>
              </v-flex>
              <v-flex xs8 pl-3>
                <v-text-field v-model="documento.categoria.nome" disabled></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon color="primary" @click.stop="categorias = !categorias">
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
                  <td>{{ props.item.codigo }}</td>
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

      <v-dialog v-model="tipos" width="800px">
      <v-card>
        <v-card-title class="modal py-4 title">
          Lista de Tipo de Documentos
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-data-table :headers="lstTipoDocumento.headers" :items="lstTipoDocumento.items" hide-actions item-key="name">
            <template slot="items" slot-scope="props">
              <tr @click="selecionarTipo(props.item)">
                <td>{{ props.item.codigo }}</td>
                <td>{{ props.item.nome }}</td>
              </tr>
            </template>
          </v-data-table>
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
      documentos: false,
      tipos: false,
      categorias: false,
      anexos: false,
      habilita: false,
      mask: '##/####',
      documento: {
        codigo: '',
        usuario: {
          codigo: '',
          nome: ''
        },
        clube: {
          codigo: '',
          nome: ''
        },
        tipo: '',
        categoria: '',
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
      cbb: {
        tipo: [ 'Relatório', 'Projeto' ],
        categoria: [ 'Secretaria', 'Tesouraria', 'Internos', 'Internacionais' ]
      },
      lstDocumentos: {
        headers: [
          { text: 'Código', value: 'codigo' },
          { text: 'Clube', value: 'clube' },
          { text: 'Categoria', value: 'categoria' },
          { text: 'Mês Ref.', value: 'mesRef' },
          { text: 'Data Envio', value: 'dataEnvio' }
        ],
        items: [
          {
            value: false,
            codigo: 1,
            clube: {
              codigo: 1,
              nome: 'Rotaract Club de Cruzeiro do Oeste'
            },
            categoria: 'Secretaria',
            mesRef: '01/2018',
            dataEncio: '02/01/2018'
          },
          {
            value: false,
            codigo: 2,
            clube: {
              codigo: 1,
              nome: 'Rotaract Club de Cruzeiro do Oeste'
            },
            categoria: 'Tesouraria',
            mesRef: '01/2018',
            dataEncio: '15/01/2018'
          },
          {
            value: false,
            codigo: 3,
            clube: {
              codigo: 2,
              nome: 'Rotaract Club de Cianorte'
            },
            categoria: 'Secretaria',
            mesRef: '01/2018',
            dataEncio: '01/02/2018'
          },
          {
            value: false,
            codigo: 4,
            clube: {
              codigo: 2,
              nome: 'Rotaract Club de Cianorte'
            },
            categoria: 'Tesouraria',
            mesRef: '01/2018',
            dataEncio: '02/01/2018'
          },
          {
            value: false,
            codigo: 5,
            clube: {
              codigo: 4,
              nome: 'Rotaract Club de Goioerê'
            },
            categoria: 'Internos',
            mesRef: '',
            dataEncio: '03/03/2018'
          },
          {
            value: false,
            codigo: 6,
            clube: {
              codigo: 3,
              nome: 'Rotaract Club de Umuarama'
            },
            categoria: 'Profissionais',
            mesRef: '',
            dataEncio: '06/04/2018'
          },
          {
            value: false,
            codigo: 7,
            clube: {
              codigo: 5,
              nome: 'Rotaract Club de Paranavaí'
            },
            categoria: 'Secretaria',
            mesRef: '01/2018',
            dataEncio: '06/01/2018'
          }
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
            nome: 'Relatório'
          },
          {
            value: false,
            codigo: 2,
            nome: 'Projetos'
          }
        ]
      },
      tblAnexo: {
        headers: [
          { text: 'Código', value: 'codigo' },
          { text: 'Descrição', value: 'descricao' },
          { text: 'Opção', value: 'opcao' }
        ],
        items: [
          {
            value: false,
            numero: 1,
            descricao: 'Relatório da Tesouraria'
          },
          {
            value: false,
            numero: 2,
            descricao: 'Comprovante de Depósito'
          }
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
    selecionarDocumento (item) {
      this.habilita = true
      this.documentos = false
      this.documento = item
    },
    selecionarTipo (item) {
      this.tipos = false
      this.documento.tipo = item
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
    }
  }
}
</script>

<style>

</style>
