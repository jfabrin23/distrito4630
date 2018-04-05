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
    </v-app>
  </div>
</template>

<script>
import Cabecalho from '@/components/Header'
export default {
  name: 'home',
  components: {
    Cabecalho
  }
}
</script>

<style>

</style>
