import ElementMap from './element-map'
import { isFunction } from 'element-ui/src/utils/types'

const InputMap = ['el-input', 'el-input-number', 'ba-editor']

function getRule(item) {
  const { rule, isRequired, type, title } = item
  if (typeof isRequired === 'boolean' && isRequired) {
    const isInput = InputMap.indexOf(type) > -1
    return {
      required: true,
      message: `请${isInput ? '输入' : '选择'}${title}`,
      trigger: `${isInput ? 'blur' : 'change'}`
    }
  } else if (isRequired) {
    return rule
  } else {
    return null
  }
}

export function computeFormItem(config, form) {
  const item = { ...config }
  // 计算组件真实对应的名称并传入一些默认配置
  const res = ElementMap[item.type || 'input']
  item.type = res.component
  item.props = Object.assign({}, res.props, item.props)

  // 处理联动
  if (isFunction(item.getProps)) {
    Object.assign(item.props, item.getProps(form))
  }
  item._isShow = isFunction(item.isShow) ? !!item.isShow(form) : true

  // 处理校验
  item._rule = getRule(item)

  // 设置内容宽度
  if (item.contentWidth) {
    const temp = typeof item.contentWidth === 'number' ? `${item.contentWidth}px` : item.contentWidth
    item.props.style = { width: temp }
  }

  // 防止表单提交时存在多余 key
  if (!item._isShow) {
    delete form[item.key]
  }

  return item
}
