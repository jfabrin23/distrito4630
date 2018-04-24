<template>
  <div class="ModalUsuario">
    <v-dialog v-model="modal" width="800px" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Lista de Usuario
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
          <v-data-table :headers="lstUsuario.headers" :items="lstUsuario.items" hide-actions item-key="name" :search="search" v-if="!lstUsuario.erro.mostrar">
            <template slot="items" slot-scope="props">
              <tr @click="selecionar(props.item)">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.nome }}</td>
                <td>{{ props.item.clube.nome }}</td>
              </tr>
            </template>
          </v-data-table>
          <v-alert :type="lstUsuario.erro.tipo" :value="true" v-if="lstUsuario.erro.mostrar">
            {{lstUsuario.error.texto}}
          </v-alert>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalUsuario',
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
      this.$emit('usuario', item)
    },
    close (val) {
      this.$emit('usuarios', val)
    }
  },
  props: [
    'lstUsuario',
    'modal'
  ]
}
</script>

<style>

</style>
