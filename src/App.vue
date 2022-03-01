<template>
  <div class="container">
    <h1 class="title">Lorem ipsum dolor sit</h1>
    <the-filter @submitHandler="submitHandler" @reset="isFiltered = false" />
    <div class="card">
      <div
        class="card-item"
        v-for="building in filteredData"
        :key="building.id"
      >
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
import TheFilter from "./components/TheFilter.vue";
export default {
  components: { TheFilter },
  name: "App",
  data() {
    return {
      filteredItems: [],
      isFiltered: false,
    };
  },
  computed: {
    ...mapGetters(["buildings"]),
    filteredData() {
      if (this.isFiltered) {
        return this.filteredItems;
      } else {
        return this.buildings;
      }
    },
  },
  methods: {
    prettify(num) {
      return num
        .toString()
        .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
    },
    submitHandler(payload) {
      this.isFiltered = true;
      const filteredItems = this.buildings.filter((blog) => {
        return (
          blog.size.includes(payload.size) &&
          blog.price > payload.price.min * 1000000 &&
          payload.price.max * 1000000 > blog.price &&
          blog.square > payload.square.min &&
          payload.square.max > blog.square &&
          blog.floor >= payload.floor.min &&
          payload.floor.max >= blog.floor
        );
      });
      this.filteredItems = filteredItems;
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchData");
  },
};
</script>
