<template>
  <div class="container">
    <h1 class="title">Lorem ipsum dolor sit</h1>
    <the-filter />
    <div class="card">
      <div class="card-item" v-for="building in buildings" :key="building.id">
        <div class="card-top">
          <div class="card-top__flour">3 этаж</div>
          <div class="card-top__info">
            1 комната <span>-</span> 22.94м<sup>2</sup>
          </div>
        </div>
        <div class="card-inner">
          <div class="card-inner__id">№256</div>
          <img class="card-inner__img" :src="building.plan" alt="image" />
        </div>
        <div class="card-footer">
          <div class="card-footer__price">2 729 860р.</div>
          <div class="card-footer__info">119 000 р. за м<sup>2</sup></div>
        </div>
        <button class="card-btn btn">ПОДРОБНЕЕ</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheFilter from "./components/TheFilter.vue";
export default {
  components: { TheFilter },
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["buildings"]),
  },
  async mounted() {
    await this.$store.dispatch("fetchData");
  },
};
</script>
