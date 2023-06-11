import { Footer, Navigation } from 'components/layout'

const PancakeStackLayout = ({
  children,
}: {
  readonly children: React.ReactNode
}): ComponentReturnType => (
  <div id='pancake-stack-layout'>
    <header>
      <Navigation success error={false} />
    </header>

    <main>{children}</main>

    <footer>
      <Footer />
    </footer>

    <style jsx>{`
      #pancake-stack-layout {
        border: 1px solid red;
        display: grid;
        grid-template-rows: auto 1fr auto;
      }
    `}</style>
  </div>
)

export default PancakeStackLayout
