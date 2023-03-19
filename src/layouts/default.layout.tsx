import { Footer, Navigation } from 'components/layout'

const DefaultLayout = ({
  children,
}: {
  readonly children: React.ReactNode
}): ComponentReturnType => (
  <>
    <header>
      <Navigation success error={false} />
    </header>

    <aside aria-labelledby='comp1' className='left'>
      <p id='comp1'>Cryptids of Cornwall:</p>
      <dl>
        <dt>Beast of Bodmin</dt>
        <dd>A large feline inhabiting Bodmin Moor.</dd>

        <dt>Morgawr</dt>
        <dd>A sea serpent.</dd>

        <dt>Owlman</dt>
        <dd>A giant owl-like creature.</dd>
      </dl>
    </aside>

    {children}

    <aside aria-labelledby='comp2' className='right'>
      <h2 id='comp2'>Title for complementary area 2</h2>
      <p>Something which is supposed to be on the right side</p>
    </aside>

    <footer>
      <Footer />
    </footer>
  </>
)

export default DefaultLayout
