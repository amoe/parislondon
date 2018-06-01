n<template>
  <div class="content">
    <div class="header">
      Paris-London; Global Music Connections 1962-89
    <button v-on:click="toggleSidebar">Toggle sidebar</button>
    </div>


    <div class="maps" v-bind:class="{expanded: isMapExpanded}">
      <div id="map-paris" class="map"></div>
      <div id="map-london" class="map"></div>
    </div>

    <transition name="fade"
                v-on:after-leave="afterLeave"
                v-on:before-enter="beforeEnter">
      <div class="sidebar" v-show="isSidebarShown">
        <h1>PARIS / LONDON</h1>

        <h2>Population</h2>

        <div id="chart"></div>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id neque nec
          velit ultricies sodales a sed leo. Maecenas vitae leo eleifend, accumsan odio
          vitae, sodales massa. Sed purus sem, viverra non mi ac, dignissim ornare
          leo. Nulla pharetra ipsum sit amet euismod egestas. Duis tellus urna, lacinia eu
          dolor in, viverra aliquam purus. Maecenas dolor lorem, dapibus et cursus
          pretium, laoreet at nunc. Proin ullamcorper justo ut nibh placerat
          auctor. Integer rhoncus augue lorem, a finibus elit rhoncus sit amet. Vestibulum
          efficitur mauris at feugiat hendrerit. Pellentesque maximus orci ac lacus
          venenatis, ut rutrum dui dictum. Curabitur auctor turpis massa, sit amet auctor
          libero mattis ac.</p>

        <p>Sed suscipit accumsan interdum. Praesent bibendum nisl eget aliquam
          dignissim. Donec lacinia a purus at lobortis. In ac sapien vel velit ultrices
          congue. Donec at sapien non velit pretium consectetur ac id purus. Donec
          placerat blandit ullamcorper. Maecenas nec luctus purus, ac blandit
          nisl. Integer non pellentesque ligula. Sed ullamcorper dui vel mauris venenatis
          lobortis.</p>

        <p>Duis massa mauris, porttitor iaculis elit eu, pharetra finibus ipsum. Aenean nec
          elit pretium, tempus mauris sed, sagittis enim. Cras efficitur, ligula vel
          condimentum vulputate, odio dui posuere metus, in commodo ex risus eu quam. Nunc
          odio sem, efficitur et tincidunt sit amet, dignissim sit amet
          purus. Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Ut at ultrices nunc. Integer sed ex neque. Ut molestie
          nibh sit amet quam scelerisque, et pellentesque est vestibulum. Quisque varius
          lacus vitae tellus lacinia, efficitur blandit nibh aliquam. Curabitur vestibulum
          aliquam lacus et elementum. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Sed eleifend augue quis nulla lacinia mattis vitae vel nisi.</p>

        <p>Curabitur maximus odio felis, sed rutrum metus laoreet eget. Nunc tempor sit
          amet dolor ac pellentesque. Maecenas mollis ex sed augue consectetur
          fringilla. Vestibulum ac turpis sed enim bibendum eleifend. Quisque quis
          malesuada magna, sit amet congue arcu. Nunc in congue nunc. Pellentesque
          tristique sem enim, non laoreet metus consectetur eu. Mauris finibus ipsum eget
          eros posuere, ut porttitor quam gravida.</p>

        <p>Aenean commodo velit at metus bibendum, eu egestas metus interdum. Curabitur sed
          erat malesuada, egestas lorem in, facilisis sapien. Nullam maximus porttitor
          velit et consequat. Curabitur malesuada quam eu arcu tincidunt
          tincidunt. Phasellus quis pharetra tellus, vitae faucibus lorem. Vestibulum
          luctus, justo a mattis consequat, libero odio pellentesque lectus, at euismod
          dui leo in ante. Pellentesque lacus sem, varius eleifend imperdiet at, dictum
          vitae dui. Vivamus elementum augue lacus, vitae consequat lacus porttitor
          ut. Mauris mattis nibh in leo tempus interdum. Nam bibendum lectus viverra
          scelerisque elementum. Etiam mattis vehicula ex, sed euismod libero aliquam
          id. Suspendisse suscipit pulvinar mi ut consectetur. Etiam congue ante at tempor
          facilisis. Donec vitae consectetur felis. Suspendisse arcu orci, elementum ac
          laoreet in, gravida et urna.</p>
      </div>
    </transition>
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

export default Vue.extend({
    components: {
    },
    data() {
        return {
            kilometreZero: KILOMETRE_ZERO,
            equestrianStatue: EQUESTRIAN_STATUE,
            locationData,
            isSidebarShown: true,
            isMapExpanded: false,
            mapParis: null,
            mapLondon: null
        };
    },
    created() {
    },
    mounted() {
        this.$nextTick(() => {
            this.doMain();
        })
    },
    methods: {
        forEachMap(fn) {
            fn(this.mapParis);
            fn(this.mapLondon);
        },
        afterLeave() {
            console.log("after leave callback triggered");

            this.isMapExpanded = true;

            // Use of nextTick here is required to avoid visual glitches
            // See <https://stackoverflow.com/questions/24412325>
            this.$nextTick(function () {
                this.forEachMap(m => m.invalidateSize())
            });
        },
        beforeEnter() {
            this.isMapExpanded = false;
        },
        doMain() {
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

            this.mapParis = mapParis;
            this.mapLondon = mapLondon;

        },
        toggleSidebar() {
            this.isSidebarShown = !this.isSidebarShown;

            // Invalidating the size will be handled by the `afterLeave` callback
            // above
        }
    }
});
</script>

<style>
@import url("~leaflet/dist/leaflet.css");
@import url("~c3/c3.css");

@font-face {
    font-family: 'Oxygen';
    src: url("../../static/fonts/Oxygen-Regular.ttf");
}

@font-face {
    font-family: 'Vollkorn';
    src: url("../../static/fonts/Vollkorn-Regular.ttf");
}


p {
    font-family: 'Oxygen', sans-serif;
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
/*    width: 81vw; */
    border: 1px solid red;
}

.maps {
    grid-row-start: 2;
    grid-column-start: span 10;
    border: 1px solid blue;
}

.maps.expanded {
    grid-column-start: span 12;
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
    height: 92vh;   /* 2x div.map height */
    overflow-y: scroll;
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

/* FADE TRANSITIONS FOR SIDEBAR */

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
