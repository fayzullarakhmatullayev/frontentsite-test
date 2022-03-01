<template>
  <form class="filter" @submit.prevent="submitHandler">
    <div class="filter-block filter-rooms">
      <div class="filter-text">КОМНАТЫ</div>
      <div
        class="filter-wrapper filter-rooms__wrapper"
        @click="getRoomsCount($event)"
      >
        <div class="filter-rooms__btn" data-size="XS">S</div>
        <div class="filter-rooms__btn active" data-size="1k">1к</div>
        <div class="filter-rooms__btn" data-size="2k">2к</div>
        <div class="filter-rooms__btn" data-size="3k">3к</div>
      </div>
    </div>
    <div class="filter-block filter-flour">
      <div class="filter-text">ЭТАЖ</div>
      <div class="filter-wrapper filter-flour__wrapper">
        <input type="number" class="inputNumber-1" v-model="floor.min" />
        <span>-</span>
        <input type="number" class="inputNumber-2" v-model="floor.max" />
      </div>
      <div class="filter-range">
        <div class="slider-track"></div>
        <input
          type="range"
          min="1"
          class="slider-1"
          max="99"
          v-model="floor.min"
        />
        <input
          type="range"
          min="1"
          class="slider-2"
          max="99"
          v-model="floor.max"
        />
      </div>
    </div>
    <div class="filter-block filter-flour">
      <div class="filter-text">ПЛОЩАДЬ, м<sup>2</sup></div>
      <div class="filter-wrapper filter-flour__wrapper">
        <input type="number" class="inputNumber-1" v-model="square.min" />
        <span>-</span>
        <input type="number" class="inputNumber-2" v-model="square.max" />
      </div>
      <div class="filter-range">
        <div class="slider-track"></div>
        <input
          type="range"
          class="slider-1"
          min="20"
          max="999"
          v-model="square.min"
        />
        <input
          type="range"
          class="slider-2"
          min="20"
          max="999"
          v-model="square.max"
        />
      </div>
    </div>
    <div class="filter-block filter-flour">
      <div class="filter-text">СТОИМОСТЬ, млн. р.</div>
      <div class="filter-wrapper filter-flour__wrapper">
        <input
          type="number"
          class="inputNumber-1 price-1"
          v-model="price.min"
        />
        <span>-</span>
        <input
          type="number"
          class="inputNumber-2 price-2"
          v-model="price.max"
        />
      </div>
      <div class="filter-range">
        <div class="slider-track"></div>
        <input
          type="range"
          class="slider-1"
          min="1.0"
          max="99.9"
          v-model="price.min"
        />
        <input
          type="range"
          class="slider-2"
          min="1"
          max="99"
          v-model="price.max"
        />
      </div>
    </div>
    <div class="filter-block filter-btn">
      <button class="btn filter-btn__submit" type="submit">Применить</button>
      <button class="filter-btn__reset" @click.prevent="resetFilter()">
        сбросить фильтр
      </button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["submitHandler", "reset"],
  data() {
    return {
      size: ["1k"],
      floor: {
        min: 1,
        max: 99,
      },
      square: {
        min: 1,
        max: 999,
      },
      price: {
        min: 1,
        max: 99,
      },
    };
  },
  methods: {
    submitHandler() {
      this.$emit("submitHandler", {
        size: this.size,
        floor: this.floor,
        square: this.square,
        price: this.price,
      });
    },
    getRoomsCount(e) {
      if (e.target.closest(".filter-rooms__btn")) {
        const btn = e.target;
        btn.classList.toggle("active");
        if (btn.classList.contains("active")) {
          this.size.push(btn.dataset.size);
        } else {
          const idx = this.size.indexOf(btn.dataset.size);
          this.size.splice(idx, 1);
        }
      }
    },
    inputFilterRange() {
      const filterBlock = document.querySelectorAll(".filter-flour");
      filterBlock.forEach((block) => {
        this.fillColor(block);
        let minGap = 0;
        const sliderOne = block.querySelector(".slider-1");
        const sliderTwo = block.querySelector(".slider-2");

        const inputNumberOne = block.querySelector(".inputNumber-1");
        const inputNumberTwo = block.querySelector(".inputNumber-2");

        sliderOne.addEventListener("input", () => {
          if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
            sliderOne.value = parseInt(sliderTwo.value) - minGap;
          }
          inputNumberOne.value = sliderOne.value;
          this.fillColor(block);
        });

        sliderTwo.addEventListener("input", () => {
          if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
            sliderTwo.value = parseInt(sliderOne.value) - minGap;
          }
          inputNumberTwo.value = sliderTwo.value;
          this.fillColor(block);
        });
      });
    },
    fillColor(block) {
      const sliderOne = block.querySelector(".slider-1");
      const sliderTwo = block.querySelector(".slider-2");
      const sliderTrack = block.querySelector(".slider-track");
      const sliderMaxValue = block.querySelector(".slider-1").max;

      const percent1 = Math.floor((sliderOne.value / sliderMaxValue) * 100);
      const percent2 = Math.floor((sliderTwo.value / sliderMaxValue) * 100);
      sliderTrack.style.background = `
          linear-gradient(to right, #D8D8D8 ${percent1}%, #70D24E ${percent1}%, #70D24E ${percent2}%,  #D8D8D8 ${percent2}%)
        `;
    },
    resetFilter() {
      const sliderTracks = document.querySelectorAll(".slider-track");
      const filtetRoomsBtn = document.querySelectorAll(".filter-rooms__btn");
      this.size = ["1k"];
      this.floor = {
        min: 1,
        max: 99,
      };
      this.square = {
        min: 1,
        max: 999,
      };
      this.price = {
        min: 1,
        max: 99,
      };
      sliderTracks.forEach((track) => {
        track.style.background = `
          linear-gradient(to right, #70D24E 1%, #70D24E 100%, #70D24E 1%,  #70D24E 100%)
        `;
      });
      filtetRoomsBtn.forEach((btn) => {
        btn.classList.remove("active");
        filtetRoomsBtn[1].classList.add("active");
      });
      this.$emit("reset");
    },
  },
  mounted() {
    this.inputFilterRange();
  },
};
</script>

<style></style>
