### Pro-Form 属性

| 参数       | 说明                 | 类型    | 默认值 |
| ---------- | -------------------- | ------- | ------ |
| fields     | 见上方               | Array   | []     |
| hasControl | 控制表单按钮显示隐藏 | Boolean | true   |
| submitText | 提交按钮显示文本     | String  | '提交' |
| resetText  | 重置按钮显示文本     | String  | '重置' |



### fields 的属性

| 参数         | 说明                                      | 类型                     | 默认值  |
| ------------ | ----------------------------------------- | ------------------------ | ------- |
| title        | 表单名称                                  | String                   | ''      |
| key          | 表单字段                                  | String                   | ''      |
| type         | 表单类型                                  | input、select、radio...  | 'Input' |
| options      | 当表单元素为select、raido、checkbox时使用 | []{ label: '', value:''} | []      |
| defaultValue | 表单元素的默认值                          | String｜Number｜Array    |         |
| props        | 用来接受element原始表单所有属性           | Object                   |         |

