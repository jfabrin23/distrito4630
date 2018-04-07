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
                <v-text-field label="Nome" v-model="tipoDocumento.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-checkbox label="Mês Ref." v-model="mesRef" :error-messages="checkboxErrors" @change="$v.mesRef.$touch()" @blur="$v.mesRef.$touch()" required></v-checkbox>
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
import Rodape from '@/components/Footer'

export default {
  name: 'TipoDocumento',
  components: {
    Cabecalho,
    Rodape
  },
  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.mesRef.$dirty) return errors
      !this.$v.mesRef.required && errors.push('You must agree to continue!')
      return errors
    }
  },
  data () {
    return {
      valid: true,
      tipoDocumentos: false,
      tipoDocumento: {
        codigo: '',
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
