<template>
  <div>
    <ul>
      <li v-for="content in contents" :key="content.id">
        <nuxt-link :to="`/${content.id}`">
          {{ content.title }}
        </nuxt-link>
      </li>
    </ul>

    <!-- <Pagenation
      :pager="pager"
      :current="Number(page)"
      :category="selectedCategory"
    /> -->
  </div>
</template>

<script>
export default {
  async asyncData({ $microcms, params }) {
    const page = params.p || '1'
    const categoryId = params.categoryId
    const limit = 10

    const data = await $microcms.get({
      endpoint: `blog?limit=${limit}${categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`}&offset=${(page - 1) * limit}`,
    });

    return data

    // const categories = await $microcms.get({
    //   endpoint: `categories?limit=100`,
    // });

    // const selectedCategory =
    //   categoryId !== undefined
    //     ? categories.data.contents.find((content) => content.id === categoryId)
    //     : undefined;

    // return {
    //   ...data,
    //   selectedCategory,
    //   page,
    //   pager: [...Array(Math.ceil(data.totalCount / limit)).keys()],
    // };
  },
}
</script>
