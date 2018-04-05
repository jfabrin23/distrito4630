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
                <v-text-field label="Mês Rêf." v-model="documento.mesRef" :mask="mask" :rules="regrasValidacao.mesRef" required></v-text-field>
              </v-flex>
              <v-flex xs9 pl-3>
                <v-select label="Categoria" v-model="documento.categoria" :items="cbb.categoria" :rules="regrasValidacao.categoria" required autocomplete></v-select>
              </v-flex>

              <v-flex xs12>
                <v-text-field name="input-1" label="Observação" v-model="documento.observacao" textarea></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field type="file" label="Anexo" v-model="documento.anexo" :rules="regrasValidacao.anexo" required></v-text-field>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />
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
      categorias: false,
      documentos: false,
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
        categoria: '',
        mefRef: '',
        observacao: '',
        dataEnvio: new Date(),
        anexo: ''
      },
      regrasValidacao: {
        categoria: [
          v => !!v || 'Categoria é obrigatório'
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
        ]
      },
      cbb: {
        categoria: [ 'Secretaria', 'Tesouraria', 'Internos', 'Internacionais' ]
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
      this.tabela = false
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
