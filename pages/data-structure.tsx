import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import EditPageLink from '../src/EditPageLink';
import DataStructureDocs from '../docs/data-structure.mdx';

export default function DataStructure() {
  return (
    <Layout>
      <DataStructureDocs />
      <EditPageLink path="docs/data-structure.mdx" />
      <FooterLinks
        step={2}
        prev={{ link: '/getting-started', label: 'Getting Started' }}
        next={{ link: '/syntax', label: 'Syntax' }}
      />
    </Layout>
  );
}
