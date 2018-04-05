<template>
  <div class="Home">
    <v-app>
      <!-- Header -->
      <Cabecalho />

      <!-- Conteudo -->
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
          </v-layout>
        </v-container>
      </v-content>

      <Rodape />
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
import Rodape from '@/components/Footer'
export default {
  name: 'home',
  components: {
    Cabecalho,
    Rodape
  }
}
</script>

<style>

</style>
