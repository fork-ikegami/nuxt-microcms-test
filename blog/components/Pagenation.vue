<template>
  <div>
    <ul>
      <li v-if="current > 1">
        <nuxt-link :to="getPath(current - 1)">＜</nuxt-link>
      </li>
      <li v-if="3 < current">
        <nuxt-link :to="getPath(1)">1</nuxt-link>
      </li>
      <li v-if="4 < current">...</li>
      <li
        v-for="p in pager"
        v-show="current - 3 <= p && p <= current + 1"
        :key="p"
        :class="{ active: current === p + 1}"
      >
        <nuxt-link :to="getPath(p + 1)">
          {{ p + 1 }}
        </nuxt-link>
      </li>
      <li v-if="current + 3 < pager.length">...</li>
      <li v-if="current + 2 < pager.length">
        <nuxt-link :to="getPath(pager.length)">
          {{ pager.length }}
        </nuxt-link>
      </li>
      <li v-if="current < pager.length">
        <nuxt-link :to="getPath(current + 1)">＞</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // ページ番号
    pager: {
      type: Array,
      required: false,
      default: () => [],
    },
    // 現在のページ番号
    current: {
      type: Number,
      required: true,
    },
    // カテゴリ情報
    category: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
  methods: {
    getPath(p) {
      return `/${
        this.category !== undefined ? `category/${this.category.id}/` : ''
      }page/${p}`;
    },
  },
};
</script>
