const page = (props) => (
  <div>comments page... {props.id}</div>
)

page.getInitialProps = ({ query }) => ({
  id: query.id
})

export default page
