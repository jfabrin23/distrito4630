<template>
  <div class="ModalCategoria">
    <v-dialog v-model="modal" width="800px" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Lista de Categorias
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
          <v-data-table :headers="lstCategoria.headers" :items="lstCategoria.items" hide-actions item-key="name" :search="search" v-if="!lstCategoria.erro.mostrar">
            <template slot="items" slot-scope="props">
              <tr @click="selecionar(props.item)">
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
  </div>
</template>

<script>
export default {
  name: 'ModalCategoria',
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
      this.$emit('categoria', item)
    },
    close (val) {
      this.$emit('categorias', val)
    }
  },
  props: [
    'lstCategoria',
    'modal'
  ]
}
</script>

<style>

</style>
