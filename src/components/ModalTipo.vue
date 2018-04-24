<template>
  <div class="ModalTipo">
    <v-dialog v-model="modal" width="800px" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Lista de Tipo de Documento
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
          <v-data-table :headers="lstTipoDocumento.headers" :items="lstTipoDocumento.items" hide-actions item-key="name" :search="search" v-if="!lstTipoDocumento.erro.mostrar">
            <template slot="items" slot-scope="props">
              <tr @click="selecionar(props.item)">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.nome }}</td>
              </tr>
            </template>
          </v-data-table>
          <v-alert :type="lstTipoDocumento.erro.tipo" :value="true" v-if="lstTipoDocumento.erro.mostrar">
            {{lstTipoDocumento.error.texto}}
          </v-alert>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalTipo',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    selecionar (item) {
      this.$emit('tipoDocumento', item)
    },
    close (val) {
      this.$emit('tipoDocumentos', val)
    }
  },
  props: [
    'lstTipoDocumento',
    'modal'
  ]
}
</script>

<style>

</style>
