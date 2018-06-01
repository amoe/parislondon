<template>
<div>
<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">expand</el-radio-button>
  <el-radio-button :label="true">collapse</el-radio-button>
</el-radio-group>
<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">Navigator One</span>
    </template>
    <el-menu-item-group>
      <span slot="title">Group One</span>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group Two">
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">item four</span>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">Navigator Two</span>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <span slot="title">Navigator Three</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">Navigator Four</span>
  </el-menu-item>
</el-menu>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import utility from '../utility';
import sprintf from 'sprintf-js';
import locationData from '../data';
import * as c3 from 'c3';
import * as L from 'leaflet';

const markerIconSelections = {
    green: new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    red: new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    blue: new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
}

// position is lat, lng array
function addPopup(theMap, position, text, iconType) {
    const icon = markerIconSelections[iconType];
    // Add a marker
    var marker = L.marker(position, {icon}).addTo(theMap);

    const popup = L.popup().setContent(text);

    marker.bindPopup(popup);
}

const LEAFLET_TILE_LAYER_OPTIONS = {
    attributionControl: false,
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: MAPBOX_ACCESS_TOKEN
};

const TILE_LAYER_URL_TEMPLATE = 
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';


const PARIS_POPULATION_DATA = [
    [1954, 2850189, 6436296],
    [1962, 2790091, 7384363],
    [1968, 2590771, 8196746],
    [1975, 2299830, 8549898],
    [1982, 2176243, 8706963],
    [1990, 2152423, 9318821],
//    [2010, 2243833, 10460118]
];

const LONDON_POPULATION_DATA = [
    [1951, 8196978],
    [1961, 7992616],
    [1971, 7452520],
    [1981, 6805000],
    [1991, 6829300]
];


const KILOMETRE_ZERO = {
    latitude: 48.853622,
    longitude: 2.348768
};

const EQUESTRIAN_STATUE = {
    latitude: 51.507861,
    longitude: -0.127570
};

function makeMap(containerId, position) {
    var theMap = L.map(containerId).setView(
        [position.latitude, position.longitude], 13
    );
    // Add the tile layer
    L.tileLayer(TILE_LAYER_URL_TEMPLATE, LEAFLET_TILE_LAYER_OPTIONS).addTo(theMap);
    return theMap;
}

function makeColumn(id, contents) {
    return [id].concat(contents);
}

function doMain() {
    const mapParis = makeMap('map-paris', KILOMETRE_ZERO);
    const mapLondon = makeMap('map-london', EQUESTRIAN_STATUE);

    for (let datum of locationData.london1960s) {
        addPopup(
            mapLondon,
            [datum.location.latitude, datum.location.longitude],
            datum.address,
            'blue'
        );
    }

    for (let datum of locationData.london1970s) {
        addPopup(
            mapLondon,
            [datum.location.latitude, datum.location.longitude],
            datum.address,
            'green'
        );
    }

    for (let datum of locationData.london1980s) {
        addPopup(
            mapLondon,
            [datum.location.latitude, datum.location.longitude],
            datum.address,
            'red'
        );
    }

    var chart = c3.generate({
        bindto: '#chart',
        data: {
            xs: {
                'Paris': 'x1',
                'London': 'x2'
            },
            columns: [
                makeColumn('Paris', PARIS_POPULATION_DATA.map(x => x[2])),
                makeColumn('London', LONDON_POPULATION_DATA.map(x => x[1])),
                makeColumn('x1', PARIS_POPULATION_DATA.map(x => x[0])),
                makeColumn('x2', LONDON_POPULATION_DATA.map(x => x[0]))
            ]
        }
    });
}

export default Vue.extend({
    components: {
    },
    data() {
        return {
            kilometreZero: KILOMETRE_ZERO,
            equestrianStatue: EQUESTRIAN_STATUE,
            locationData,
            isCollapse: true   // used by sidebar
        };
    },
    created() {
    },
    mounted() {
        this.$nextTick(function () {
            doMain();
        })
    },
    methods: {
        doMain() {
        }
    }
});
</script>

<style>
@import url("~leaflet/dist/leaflet.css");
@import url("~c3/c3.css");

/* @font-face { */
/*     font-family: 'Oxygen'; */
/*     src: url("static/fonts/Oxygen-Regular.ttf"); */
/* } */

/* @font-face { */
/*     font-family: 'Vollkorn'; */
/*     src: url("static/fonts/Vollkorn-Regular.ttf"); */
/* } */


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
