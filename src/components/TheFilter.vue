<template>
  <form class="filter">
    <div class="filter-block filter-rooms">
      <div class="filter-text">КОМНАТЫ</div>
      <div class="filter-wrapper filter-rooms__wrapper">
        <div class="filter-rooms__btn active">S</div>
        <div class="filter-rooms__btn">1к</div>
        <div class="filter-rooms__btn">2к</div>
        <div class="filter-rooms__btn">3к</div>
      </div>
    </div>
    <div class="filter-block filter-flour">
      <div class="filter-text">ЭТАЖ</div>
      <div class="filter-wrapper filter-flour__wrapper">
        <input type="number" placeholder="1" /> <span>-</span>
        <input type="number" placeholder="99" />
      </div>
      <div class="filter-range">
        <input type="range" min="1" max="50" />
        <input type="range" min="51" max="100" />
      </div>
    </div>
    <div class="filter-block filter-flour">
      <div class="filter-text">ПЛОЩАДЬ, м<sup>2</sup></div>
      <div class="filter-wrapper filter-flour__wrapper">
        <input type="number" placeholder="99" />
        <input type="number" placeholder="999" />
      </div>
      <div class="filter-range">
        <input type="range" min="1" max="99" />
        <input type="range" min="100" max="1000" />
      </div>
    </div>
    <div class="filter-block filter-flour">
      <div class="filter-text">СТОИМОСТЬ, млн. р.</div>
      <div class="filter-wrapper filter-flour__wrapper">
        <input type="number" placeholder="1" />
        <input type="number" placeholder="99" />
      </div>
      <div class="filter-range">
        <input type="range" />
        <input type="range" />
      </div>
    </div>
    <div class="filter-block filter-btn">
      <button class="btn filter-btn__submit" type="submit">Применить</button>
      <button class="filter-btn__reset">сбросить фильтр</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
    };
  },
};
</script>

<style></style>
