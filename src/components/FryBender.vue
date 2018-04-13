<template>
  <div>
  <p>Template</p>

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

function domainToGmap(datum) {
    return {
        lat: datum.latitude,
        lng: datum.longitude
    }
}


export default Vue.extend({
    props: ['center'],
    computed: {
        centerExpression(this: any) {
            return domainToGmap(this.center);
        }
    }
});
</script>

<style>
.map-container {
    width: 600px;
    height: 400px;
}
</style>
