type ZzzInput = { name: string }[]

type ZzzOutput<T extends ZzzInput> = {
  [K in T[number]['name']]: string
}

function zzz<T extends ZzzInput>(input: T): ZzzOutput<T> {
  const result: any = {}
  input.forEach((item) => {
    result[item.name] = '' // 假设返回的值是字符串
  })
  return result
}

// 示例用法


有个typescript函数调用如下：const answers = zzz([{ name: 'aa' }, { name: 'bb' }])
如何编写zzz函数的类型，使它返回类型为{aa: string, bb: string}，注意参数是动态的