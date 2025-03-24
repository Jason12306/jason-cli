interface Template {
  name: string
  isInternal?: boolean
  src: string
}

const config: { templates: Template[] } = {
  templates: [
    {
      name: 'template-foo',
      isInternal: true,
      src: 'template-foo',
    },
    {
      name: 'jason12306',
      isInternal: false,
      src: 'Jason12306/jason12306',
    },
    {
      name: 'vitepress-blog',
      isInternal: false,
      src: 'Jason12306/vitepress-blog',
    },
  ],
}
export default config
