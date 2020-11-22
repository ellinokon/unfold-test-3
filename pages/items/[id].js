import Layout from "../../components/layout";
import ListItem from "../../components/list-item";
import itemsData from "../../data/items";

export default function Item({ itemData }) {
  return (
    <Layout>
      <ListItem show={true} {...itemData} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = itemsData.map((item) => ({ params: { id: item.id } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const itemData = itemsData.find((item) => item.id === params.id);

  return {
    props: {
      itemData,
    },
  };
}
