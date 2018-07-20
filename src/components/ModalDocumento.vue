<template>
  <div class="ModalDocumento">
    <v-dialog v-model="modal" width="800px" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Lista de Documento
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

          <v-data-table :headers="lstDocumento.headers" :items="lstDocumento.items" hide-actions item-key="name" :search='search'>
            <template slot="items" slot-scope="props">
              <tr @click="selecionar(props.item)">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.clube.nome }}</td>
                <td>{{ props.item.categoria.nome }}</td>
                <td>{{ props.item.mes_referencia | mesref }}</td>
                <td>{{ props.item.situacao | situacao }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalDocumento',
  data () {
    return {
      search: ''
    }
  },
  filters: {
    mesref (val) {
      var data = val.split('-')
      return data[1] + '/' + data[0]
    },
    situacao (val) {
      let situacao = 'Indefinido'
      switch (val) {
        case '1':
          situacao = 'Em Rascunho'
          break
        case '2':
          situacao = 'Enviado Representação'
          break
        case '3':
          situacao = 'Aprovado'
          break
        case '4':
          situacao = 'Recusado'
          break
      }

      return situacao
    }
  },
  methods: {
    selecionar (item) {
      this.$emit('documento', item)
    },
    close (val) {
      this.$emit('documentos', val)
    }
  },
  props: [
    'lstDocumento',
    'modal'
  ]
}
</script>

<style>

</style>
