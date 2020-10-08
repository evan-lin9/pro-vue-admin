export function getSearchFields(list) {
  const temp = list.filter(j => j.search).map(i => ({
    key: i.key,
    title: i.title,
    type: i.type,
    options: i.options,
    isInternational: i.isInternational === undefined ? true : i.isInternational,
    span: i.span || 6,
    ...i.search
  }))
  let total = 0
  const res = []
  temp.forEach(i => {
    total += i.span
    if (total <= 18) {
      res.push(i)
    }
  })
  return res
}

export function getSearchToggleFields(list) {
  const temp = list.filter(j => j.search).map(i => ({
    key: i.key,
    title: i.title,
    type: i.type,
    options: i.options,
    span: i.span || 6,
    ...i.search
  }))
  let total = 0
  const res = []
  temp.forEach(i => {
    total += i.span
    if (total > 18) {
      res.push(i)
    }
  })
  return res
}
