export function getSearchFields(list) {
  return list.filter(j => j.search).map(i => ({
    key: i.key,
    title: i.title,
    type: i.type,
    options: i.options,
    ...i.search
  }))
}
