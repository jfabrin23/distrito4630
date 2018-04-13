<template>
  <div class="Footer">
    <v-dialog v-model="modal" width="800px">
      <v-card>
        <v-card-title class="modal py-4 title">
          {{titulo}}
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-data-table :headers="lstTipoDocumento.headers" :items="lstTipoDocumento.items" hide-actions item-key="name">
            <template slot="items" slot-scope="props">
              <tr @click="selecionarTipoDocumento(props.item)">
                <td>{{ props.item.codigo }}</td>
                <td>{{ props.item.nome }}</td>
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
  name: 'Modal',
  data () {
    return {
      titulo: '',
      modal: ''
    }
  },
  methods: {
  },
  props: {
  }
}
</script>

<style>

</style>
