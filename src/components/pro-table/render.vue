<script>
export default {
  name: 'Render',
  functional: true,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    scope: Object,
    render: {
      type: Function,
      default: function() {}
    }
  },
  render: (h, ctx) => {
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : ''
  }
}
</script>
