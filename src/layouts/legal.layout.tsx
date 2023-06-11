import { Footer, Navigation } from 'components/layout'

const LegalLayout = ({
  children,
}: {
  readonly children: React.ReactChild
}): ComponentReturnType => (
  <>
    <header>
      <Navigation success error={false} />
    </header>

    {children}

    <aside>
      <p>Something which is supposed to be on the side</p>
    </aside>

    <footer>
      <Footer />
    </footer>
  </>
)

export default LegalLayout
