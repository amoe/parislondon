<template>
  <div>
    <h1>Mapping</h1>

  <gmap-map class="map-container" :center="centerExpression" :zoom="12">
    <gmap-marker :position="centerExpression">
    </gmap-marker>
    <gmap-info-window :position="centerExpression">
      Hello world!
    </gmap-info-window>
  </gmap-map>    

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import utility from '../utility';
import sprintf from 'sprintf-js';
import * as VueGoogleMaps from 'vue2-google-maps';

const KILOMETRE_ZERO = {
    latitude: 48.853622,
    longitude: 2.348768
};

const EQUESTRIAN_STATUE = {
    latitude: 51.507861,
    longitude: -0.127570
};

function domainToGmap(datum) {
    return {
        lat: datum.latitude,
        lng: datum.longitude
    };
}

export default Vue.extend({
    components: {
        VueGoogleMaps
    },
    data() {
        return {
            center: KILOMETRE_ZERO
        };
    },
    computed: {
        centerExpression(this: any) {
            return domainToGmap(this.center);
        }
    }
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
    width: 600px;
    height: 400px;
}
</style>
