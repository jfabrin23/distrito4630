<template>
  <div class="Header">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list dense>
        <template v-for="item in items">
          <v-list-group v-if="item.children && !item.admin" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="menu(child.router)">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <v-list-tile v-else-if="!item.admin" @click="menu(item.router)" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Logo Rotaract</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      dialog: false,
      drawer: true,
      items: [
        { icon: 'account_balance', text: 'Clube', router: 'clube', admin: false },
        { icon: 'person_pin', text: 'Usuário', router: 'usuario', admin: false },
        { icon: 'library_books', text: 'Tipo de Documento', router: 'tipodocumento', admin: false },
        { icon: 'loyalty', text: 'Categoria', router: 'categoria', admin: false },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Documento',
          admin: false,
          model: false,
          children: [
            { icon: 'add', text: 'Novo', router: 'documentoCadastro' },
            { icon: 'search', text: 'Buscar', router: 'documentobusca' }
          ]
        }
      ]
    }
  },
  methods: {
    menu (menu) {
      this.$router.push(menu)
    }
  },
  props: {
    source: String
  }
}
</script>

<style>

</style>
