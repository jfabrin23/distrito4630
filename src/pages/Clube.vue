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

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field label="Código" v-model="clube.codigo" disabled></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-btn flat icon color="primary" @click.stop="clubes = !clubes">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Nome" v-model="clube.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select label="Situação" v-model="clube.situacao" :items="cbb.situacao" :rules="regrasValidacao.situacao" required autocomplete></v-select>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-content>

      <Rodape />

      <v-dialog v-model="clubes" width="800px">
        <v-card>
          <v-card-title class="modal py-4 title">
            Lista de Clubes
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-data-table :headers="lstClube.headers" :items="lstClube.items" hide-actions item-key="name">
              <template slot="items" slot-scope="props">
                <tr @click="selecionar(props.item)">
                  <td>{{ props.item.codigo }}</td>
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.situacao }}</td>
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
  name: 'Clube',
  components: {
    Cabecalho,
    Rodape
  },
  data () {
    return {
      valid: true,
      clubes: false,
      clube: {
        codigo: '',
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
      cbb: {
        situacao: [
          1,
          0
        ]
      },
      lstClube: {
        headers: [
          { text: 'Código', value: 'codigo' },
          { text: 'Nome', value: 'nome' },
          { text: 'Situação', value: 'situacao' }
        ],
        items: [
          {
            value: false,
            codigo: 1,
            nome: 'Rotaract Club de Cruzeiro do Oeste',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 2,
            nome: 'Rotaract Club de Cianorte',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 3,
            nome: 'Rotaract Club de Umuarama',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 4,
            nome: 'Rotaract Club de Goioerê',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 5,
            nome: 'Rotaract Club de Paranavaí',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 6,
            nome: 'Rotaract Club de Maringa Interação',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 7,
            nome: 'Rotaract Club de Maringá Cidade Canção',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 8,
            nome: 'Rotaract Club de A',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 9,
            nome: 'Rotaract Club de B',
            situacao: 'Ativo'
          },
          {
            value: false,
            codigo: 10,
            nome: 'Rotaract Club de C',
            situacao: 'Ativo'
          }
        ]
      }
    }
  },
  methods: {
    salvar () {
      if (this.$refs.form.validate()) {
        this.axios.post('http://www.rotaract4630.com.br/rac4630/public/api/clube', this.clube)
      }
    },
    limpar () {
      this.$refs.form.reset()
    },
    selecionar (item) {
      this.clubes = false
      this.clube = item
    }
  }
}
</script>

<style>

</style>
