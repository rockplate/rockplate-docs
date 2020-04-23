import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import EditPageLink from '../src/EditPageLink';
import AdvancedUsageDocs from '../docs/advanced-usage.mdx';

export default function AdvancedUsagePage() {
  return (
    <Layout>
      <AdvancedUsageDocs />
      <EditPageLink path="docs/advanced-usage.mdx" />
      <FooterLinks step={6} prev={{ link: '/tools', label: 'Tools' }} />
    </Layout>
  );
}
