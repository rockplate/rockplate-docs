import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import EditPageLink from '../src/EditPageLink';
import GettingStartedDocs from '../docs/getting-started.mdx';

export default function GettingStarted() {
  return (
    <Layout>
      <GettingStartedDocs />
      <EditPageLink path="docs/getting-started.mdx" />
      <FooterLinks
        step={1}
        prev={{ link: '/', label: 'Home' }}
        next={{ link: '/data-structure', label: 'Data Structure' }}
      />
    </Layout>
  );
}
