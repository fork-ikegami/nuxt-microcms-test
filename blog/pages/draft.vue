<template>
  <main v-if="data">
    <h1>{{ data.title }}</h1>
    <p>{{ data.publishedAt }}</p>
    <div v-html="data.body"></div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  async created() {
    // microCMSから /draft?id=XXXXXXXX&draftKey=YYYYYYYY にアクセスさせ
    // this.$route.queryからidとdraftKeyを取得する
    const query = this.$route.query;
    if (query.id === undefined || query.draftKey === undefined) {
      return;
    }

    // idとdraftKeyを使ってAPIリクエスト
    const { data } = await $microcms.get({
      endpoint: 'blog/${query.id}',
      queries: {
        draftKey: query.draftKey,
      }
    })
    this.data = data;
  }
}
</script>
