<template>
  <div class="Categoria">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <h1>Cadastro de Categoria</h1>
          <hr />

          <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
            {{mensagem.texto}}
          </v-alert>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="categoria.id" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click="buscarCategoria">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Nome" v-model="categoria.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-select label="Situação" v-model="categoria.situacao" :items="cbb.situacao" :rules="regrasValidacao.situacao" required autocomplete></v-select>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid" :loading="loading">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
              <v-btn @click="excluir" :disabled="btnExcluir">Excluir</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <!-- Modal Categoria -->
      <ModalCategoria :lstCategoria='lstCategoria' :modal='categorias' v-on:categoria="selecionarCategoria" v-on:categorias="closeCategoria" v-if="categorias"></ModalCategoria>
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'
import ModalCategoria from '@/components/ModalCategoria'

export default {
  name: 'Categoria',
  components: {
    Cabecalho,
    Rodape,
    ModalCategoria
  },
  data () {
    return {
      valid: true,
      categorias: false,
      loading: false,
      btnExcluir: true,
      mensagem: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      categoria: {
        id: '',
        nome: '',
        situacao: null
      },
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
        ],
        situacao: [
          v => !!v || 'Situação é obrigatório'
        ]
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
      cbb: {
        situacao: [
          { value: '1', text: 'Ativo' },
          { value: '0', text: 'Inativo' }
        ]
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
        this.loading = true
        if (this.categoria.id) {
          this
            .axios
            .put('categoria/' + this.categoria.id, this.categoria)
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
            .post('categoria', this.categoria)
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
      this.btnExcluir = true
    },
    selecionarCategoria (item) {
      this.categoria = item
      this.categorias = false
      this.btnExcluir = false
    },
    closeCategoria (val) {
      this.categorias = val
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
    },
    excluir () {
      this
        .axios
        .delete('categoria/' + this.categoria.id)
        .then((success) => {
          this.loading = false
          this.limpar()
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
  }
}
</script>

<style>

</style>
