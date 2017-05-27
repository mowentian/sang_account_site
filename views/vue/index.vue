<template lang="pug">

  extends ../jade/layout.pug
  block index
    h1 {{ name }}

</template>

<script>

  import Utils from '../js/utils';
  import Options from '../js/options';
  import Client from '../js/client';

  export default {
    data() {
      return {
        name: '二狗记'
      }
    }
  }

</script>