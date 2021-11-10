<template>
  <main>
    <h1>{{ title }}</h1>
    <p>{{ publishedAt }}</p>
    <p>{{ category && category.name }}</p>
    <div v-html="body"></div>
  </main>
</template>

<script>
export default {
  async asyncData({ params,$microcms }) {
    const data = await $microcms.get({
      endpoint: `blog/${params.slug}`,
    });
    return data;
  }
}
</script>

<style lang="scss" scoped>
</style>
