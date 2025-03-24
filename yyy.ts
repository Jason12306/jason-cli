interface AA {
  name: string
}
const zzz1 = <const T extends AA[]>(
  arr: T
): { [K in T[number]['name']]: string } => {
  return {} as any
}

const answers1 = zzz1([{ name: 'aa' }, { name: 'bb' }, { name: 'cc' }])
