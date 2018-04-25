const page = (props) => (
  <div>user page... {props.id}</div>
)

page.getInitialProps = ({ query }) => ({
  id: query.id
})

export default page
