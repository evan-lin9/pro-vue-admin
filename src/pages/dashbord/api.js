export function getList(params) {
  console.log(params)
  return new Promise(resolve => resolve({
    status: 'success',
    data: {
      total: 100,
      list: [
        { id: 1, name: 'sky', status: 'online' },
        { id: 2, name: 'tiger', status: 'hide' },
        { id: 3, name: 'apple', status: 'delete' },
        { id: 4, name: 'evan', status: 'hide' },
      ]
    },
    message: ''
  }))
}

export function addUser(data) {
  console.log(data)
  return new Promise(resolve => resolve({
    status: 'success',
    data: {},
    message: '创建成功'
  }))
}

export function updateUser(data) {
  console.log(data)
  return new Promise(resolve => resolve({
    status: 'success',
    data: {},
    message: '编辑成功'
  }))
}
