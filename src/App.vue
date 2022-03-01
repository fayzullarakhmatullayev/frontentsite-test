<template>
  <div class="container">
    <h1 class="title">Lorem ipsum dolor sit</h1>
    <the-filter />
    <the-loader v-if="!buildings.length" />
    <div class="card" v-else>
      <div class="card-item" v-for="building in buildings" :key="building.id">
        <div class="card-top">
          <div class="card-top__floor">{{ building.floor }} этаж</div>
          <div class="card-top__info">
            {{ building.rooms }} комната <span>-</span>
            {{ building.square }}м<sup>2</sup>
          </div>
        </div>
        <div class="card-inner">
          <div class="card-inner__id">№{{ building.number }}</div>
          <img
            class="card-inner__img"
            :src="building.plan"
            :alt="building.building_name"
          />
        </div>
        <div class="card-footer">
          <div class="card-footer__price">{{ prettify(building.price) }}р.</div>
          <div class="card-footer__info">
            {{ prettify(Math.floor(building.price / building.square)) }}р. за
            м<sup>2</sup>
          </div>
        </div>
        <button class="card-btn btn">ПОДРОБНЕЕ</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheLoader from "./components/TheLoader.vue";
import TheFilter from "./components/TheFilter.vue";
export default {
  components: { TheFilter, TheLoader },
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["buildings"]),
  },
  methods: {
    prettify(num) {
      return num
        .toString()
        .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchData");
  },
};
</script>
