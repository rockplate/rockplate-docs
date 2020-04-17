import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import AdvancedUsageDocs from '../docs/advanced-usage.mdx';

export default function AdvancedUsagePage() {
  return (
    <Layout>
      <AdvancedUsageDocs />
      <FooterLinks step={6} prev={{ link: '/tools', label: 'Tools' }} />
    </Layout>
  );
}
