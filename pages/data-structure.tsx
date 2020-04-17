import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import DataStructureDocs from '../docs/data-structure.mdx';

export default function DataStructure() {
  return (
    <Layout>
      <DataStructureDocs />
      <FooterLinks
        step={2}
        prev={{ link: '/getting-started', label: 'Getting Started' }}
        next={{ link: '/syntax', label: 'Syntax' }}
      />
    </Layout>
  );
}
