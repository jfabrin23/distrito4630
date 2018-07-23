import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Clube from '@/pages/Clube'
import Usuario from '@/pages/Usuario'
import TipoDocumento from '@/pages/TipoDocumento'
import Categoria from '@/pages/Categoria'
import DocumentoBusca from '@/pages/DocumentoBusca'
import DocumentoCadastro from '@/pages/DocumentoCadastro'
import AlterarSenha from '@/pages/AlterarSenha'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/clube',
      name: 'Clube',
      component: Clube
    },
    {
      path: '/usuario',
      name: 'Usuario',
      component: Usuario
    },
    {
      path: '/tipodocumento',
      name: 'TipoDocumento',
      component: TipoDocumento
    },
    {
      path: '/categoria',
      name: 'Categoria',
      component: Categoria
    },
    {
      path: '/documentobusca',
      name: 'DocumentoBusca',
      component: DocumentoBusca
    },
    {
      path: '/documentocadastro',
      name: 'DocumentoCadastro',
      component: DocumentoCadastro
    },
    {
      path: '/alterarsenha',
      name: 'AlterarSenha',
      component: AlterarSenha
    },
    {
      path: '*',
      component: Login
    }
  ]
})
