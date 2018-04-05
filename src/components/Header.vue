<template>
  <div class="Header">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-layout justify-center mt-3 mb-3 class="hidden-sm-and-up">
        <v-avatar>
          <img :src="usuario.avatar" alt="John" style="margin-right:25px;">
        </v-avatar>
        <span>
          {{usuario.nome}} <br/>
          <small>{{usuario.clube.nome}}</small>
        </span>
      </v-layout>
      <hr class="hidden-sm-and-up" />
      <v-list dense>
        <template v-for="item in items">
          <v-list-group v-if="item.children && !item.admin || item.admin && usuario.tipo == 'admin'" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
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

          <v-list-tile v-else-if="!item.admin || item.admin && usuario.tipo == 'admin'" @click="menu(item.router)" :key="item.text">
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <span>
          <img :src="logoBranco" alt="Distrito 4630" height="40">
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-avatar class="hidden-sm-and-down">
        <img :src="usuario.avatar" alt="John" style="margin-right:25px;">
      </v-avatar>
      <span class="hidden-sm-and-down">
        {{usuario.nome}} <br/>
        <small>{{usuario.clube.nome}}</small>
      </span>

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
      usuario: {
        codigo: 3,
        nome: 'Paulo Celso de Brito Jr',
        clube: {
          codigo: 4,
          nome: 'Rotaract Club de Goioerê'
        },
        tipo: 'admin',
        avatar: '../../static/img/Avatar/avatar.jpg'
      },
      items: [
        { icon: 'home', text: 'Pagina Inicial', router: 'home', admin: false },
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
        },
        { icon: 'exit_to_app', text: 'Sair', router: 'sair', admin: false }
      ],
      logoBranco: '../../static/img/BRANCO.png'
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
