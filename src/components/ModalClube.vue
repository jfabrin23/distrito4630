<template>
  <div class="ModalClube">
    <v-dialog v-model="modal" width="800px" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Lista de Clube
          </label>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="close(false)" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label="Buscar" v-model="search"></v-text-field>
            </v-flex>
          </v-layout>
          <v-data-table :headers="lstClube.headers" :items="lstClube.items" :search="search" hide-actions item-key="id" v-if="!lstClube.erro.mostrar">
            <template slot="items" slot-scope="props">
              <tr @click="selecionar(props.item)">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.nome }}</td>
                <td>{{ props.item.situacao | situacao}}</td>
              </tr>
            </template>
          </v-data-table>
          <v-alert :type="lstClube.erro.tipo" :value="true" v-if="lstClube.erro.mostrar">
            {{lstClube.error.texto}}
          </v-alert>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalClube',
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
  data () {
    return {
      search: ''
    }
  },
  methods: {
    selecionar (item) {
      this.$emit('clube', item)
    },
    close (val) {
      this.$emit('clubes', val)
    }
  },
  props: [
    'lstClube',
    'modal'
  ]
}
</script>

<style>

</style>
