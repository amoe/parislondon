<template>
  <div>
    <h1>New Project from amoe-vue-template</h1>

  <gmap-map class="map-container" :center="{lat:1.38, lng:103.8}" :zoom="12"
            style="width:600px;height:400px;">
    <gmap-marker :position="{lat:1.38, lng:103.8}">
    </gmap-marker>
    <gmap-info-window :position="{lat:1.38, lng:103.8}">
      Hello world!
    </gmap-info-window>
  </gmap-map>    

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import utility from '../utility';

import * as VueGoogleMaps from 'vue2-google-maps';

export default Vue.extend({
    components: {
        VueGoogleMaps
    },
});
</script>

<style>
body {
    max-width: 64rem;
    margin-left: auto;
    margin-right: auto;
    background-color: #fdfdfd;
}

h1,h2 { font-family: Georgia; }

p, label { font-family: Arial, sans-serif; }
</style>
