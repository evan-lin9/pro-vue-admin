export function getDialogFields(list, isShow) {
  if (isShow) {
    return list
  }
  return list.filter(j => j.dialog).map(i => {
    const {
      title, key, type, options, // 4 项基础属性
      dialog: {
        type: importantType,
        defaultValue,
        rule,
        isRequired,
        isShow,
        ...props  // 额外属性
      }
    } = i
    const temp = {
      key,
      title,
      type: importantType || type, // 内层 type 覆盖外层
      defaultValue: defaultValue || '', // TODO 每种表单类型元素不一样，所以默认值也有所不同
      props: props || {}
    }

    // 去掉空配置，后续再来优化代码
    if (options) temp.options = options
    if (isRequired) temp.isRequired = isRequired
    if (isShow) temp.isShow = isShow
    if (rule) temp.rule = rule

    return temp
  })
}
