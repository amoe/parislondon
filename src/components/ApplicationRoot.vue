<template>
  <div>
    <h1>Paris-London; Global Music Connections 1962-89</h1>

  <fry-bender :center="kilometreZero"></fry-bender>
  <fry-bender :center="equestrianStatue"></fry-bender>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import utility from '../utility';
import sprintf from 'sprintf-js';
import * as VueGoogleMaps from 'vue2-google-maps';
import FryBender from './FryBender.vue';

const KILOMETRE_ZERO = {
    latitude: 48.853622,
    longitude: 2.348768
};

const EQUESTRIAN_STATUE = {
    latitude: 51.507861,
    longitude: -0.127570
};

export default Vue.extend({
    components: {
        VueGoogleMaps, FryBender
    },
    data() {
        return {
            kilometreZero: KILOMETRE_ZERO,
            equestrianStatue: EQUESTRIAN_STATUE
        };
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

</style>
