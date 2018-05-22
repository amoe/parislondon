<template>
  <div class="content">
    <div class="header">
      Paris-London; Global Music Connections 1962-89
    </div>

    <div class="maps">
      <div id="map-paris" class="map"></div>
      <div id="map-london" class="map"></div>
    </div>
    <div class="sidebar">
      <h1>PARIS / LONDON</h1>

      <h2>Population</h2>

      <div id="chart"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import utility from '../utility';
import sprintf from 'sprintf-js';
import * as VueGoogleMaps from 'vue2-google-maps';
import FryBender from './FryBender.vue';
import locationData from '../data';

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
            equestrianStatue: EQUESTRIAN_STATUE,
            locationData
        };
    },
    created() {
    }
});
</script>

<style>
@font-face {
    font-family: 'Oxygen';
    src: url("static/fonts/Oxygen-Regular.ttf");
}

@font-face {
    font-family: 'Vollkorn';
    src: url("static/fonts/Vollkorn-Regular.ttf");
}


div.content {
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(12, 1fr);
}


/* This class applies to both maps */
.map {
    height: 46vh;
    width: 81vw;
    border: 1px solid red;
}

.maps {
    grid-row-start: 2;
    grid-column-start: span 10;
    border: 1px solid blue;
}

.header {
    grid-row-start: 1;
    grid-column-start: span 12;
    font-family: 'Vollkorn', serif;
    font-size: x-large;
    margin-top: 0.4em;
    margin-left: 0.4em;
}

.sidebar {
    grid-row-start: 2;
    grid-column-start: span 2;
    border: 1px solid green;
}


h1 {
    font-family: 'Vollkorn', serif;
    text-align: center;
}

h2 {
    font-family: 'Oxygen', sans-serif;
    text-align: center;
}


/* Hide the leaflet attribution */
.leaflet-control-attribution { display: none; }

#chart {
    margin-right: 1em;
}

g.tick {
    font-family: 'Oxygen', sans-serif;
}

g.c3-legend-item {
    font-family: 'Oxygen', sans-serif;
}


</style>
