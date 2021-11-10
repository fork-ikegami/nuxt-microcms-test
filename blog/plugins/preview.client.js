// Nuxtのプレビューモード用（未使用）
export default function ({ query, enablePreview}) {
  if (query.preview) {
    enablePreview();
  }
}
