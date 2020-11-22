import Layout from "../components/layout";
import ListItem from "../components/list-item";
import itemsData from "../data/items";

export default function Home({ items }) {
  return (
    <Layout>
      {items.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { items: itemsData } };
}
