<template>
  <main v-if="data">
    <h1>{{ data.title }}</h1>
    <p>{{ data.publishedAt }}</p>
    <div v-html="data.body"></div>
  </main>
</template>

<script>
import axios from 'axios'

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
    const { data } = await axios.get(
      `https://nuxt-microcms-test.microcms.io/api/v1/blog/${query.id}?draftKey=${query.draftKey}`, {
        headers: { 'X-MICROCMS-API-KEY': '66eab1ad5b2f4871a67a3bc693924cd6389d' }
      }
    )
    this.data = data;
  }
}
</script>
