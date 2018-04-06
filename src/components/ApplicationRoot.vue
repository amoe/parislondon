<template>
  <div>
    <h1>New Project from amoe-vue-template</h1>


  <gmap-map class="map-container" :center="{lat:1.38, lng:103.8}" :zoom="12">
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

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_API_KEY,
    v: 3,
    libraries: 'places'
  }
})


export default Vue.extend({
    components: {
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

.map-container {

    width: 500px;
    height: 300px;
}

.vue-map-container {
width: 100%;
height:100%;
}
.vue-map-container .vue-map {
width: 100%;
height:100%;
}

</style>
