const Byline = ({
  author,
}: {
  readonly author: string
}): ComponentReturnType => (
  <>
    <div className='byline'>By {author}</div>
    <style jsx>{`
      .byline {
        color: green;
        font-weight: bolder;
      }
    `}</style>
  </>
)

export default Byline
