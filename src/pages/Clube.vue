<template>
  <div class="Clube">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid>
          <h1>Cadastro de Clube</h1>
          <hr />

          <v-alert :type="mensagem.tipo" :value="true" v-if="mensagem.mostrar">
            {{mensagem.texto}}
          </v-alert>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="clube.id" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click="buscarClube">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Nome" v-model="clube.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select label="Situação" v-model="clube.situacao" :items="cbb.situacao" :rules="regrasValidacao.situacao" required autocomplete></v-select>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid" :loading="loading">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
              <v-btn @click="excluir" :disabled="btnExcluir">Excluir</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <!-- Modal Clube -->
      <ModalClube :lstClube='lstClube' :modal='clubes' v-on:clube="selecionarClube" v-on:clubes="closeClube" v-if="clubes"></ModalClube>
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'
import ModalClube from '@/components/ModalClube'

export default {
  name: 'Clube',
  components: {
    Cabecalho,
    Rodape,
    ModalClube
  },
  data () {
    return {
      valid: true,
      search: '',
      loading: false,
      clubes: false,
      btnExcluir: true,
      mensagem: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      clube: {
        id: '',
        nome: '',
        situacao: null
      },
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
        ],
        situacao: [
          v => (v != null) || 'Situação é obrigatório'
        ]
      },
      cbb: {
        situacao: [
          {value: '1', text: 'Ativo'},
          {value: '0', text: 'Inativo'}
        ]
      },
      lstClube: {
        headers: [
          { text: 'Código', value: 'id' },
          { text: 'Nome', value: 'nome' },
          { text: 'Situação', value: 'situacao' }
        ],
        items: [],
        erro: {
          mostrar: false,
          texto: '',
          type: ''
        }
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
        if (this.clube.id) {
          this
            .axios
            .put('clube/' + this.clube.id, this.clube)
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
            .post('clube', this.clube)
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
    buscarClube () {
      this
        .axios
        .get('clube')
        .then((retorno) => {
          let lstItems = []
          for (var item in retorno.data.data) {
            if (retorno.data.data[item].id) {
              let registro = retorno.data.data[item]
              lstItems.push(registro)
            }
          }

          this.lstClube.items = lstItems
          this.lstClube.erro = { mostrar: false, texto: '', type: '' }
          this.clubes = true
        })
        .catch((error) => {
          this.lstClube.erro = { mostrar: true, texto: error, type: 'error' }
        })
    },
    closeClube (val) {
      this.clubes = val
    },
    selecionarClube (item) {
      this.clube = item
      this.clubes = false
      this.btnExcluir = false
    },
    excluir () {
      this
        .axios
        .delete('clube/' + this.clube.id)
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
