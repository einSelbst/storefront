const SimpleLayout = ({
  children,
}: {
  readonly children: React.ReactChild
}): ComponentReturnType => (
  <main style={{ border: '4px dashed red' }}>{children}</main>
)

export default SimpleLayout
