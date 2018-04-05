<template>
  <div class="TipoDocumento">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="tipoDocumento.codigo" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click.stop="tipoDocumentos = !tipoDocumentos">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Name" v-model="tipoDocumento.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-btn @click="salvar" :disabled="!valid">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <v-dialog v-model="tipoDocumentos" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Tipo de Documentos
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-data-table :headers="lstTipoDocumento.headers" :items="lstTipoDocumento.items" hide-actions item-key="name">
              <template slot="items" slot-scope="props">
                <tr @click="selecionar(props.item)">
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
export default {
  name: 'TipoDocumento',
  components: {
    Cabecalho
  },
  data () {
    return {
      valid: true,
      tipoDocumentos: false,
      tipoDocumento: {
        codigo: '',
        nome: ''
      },
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
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
    selecionar (item) {
      this.tipoDocumentos = false
      this.tipoDocumento = item
    }
  }
}
</script>

<style>

</style>
