import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import EditPageLink from '../src/EditPageLink';
import LinterDocs from '../docs/linter.mdx';

export default function LinterPage() {
  return (
    <Layout>
      <LinterDocs />
      <EditPageLink path="docs/linter.mdx" />
      <FooterLinks step={4} prev={{ link: '/syntax', label: 'Syntax' }} next={{ link: '/tools', label: 'Tools' }} />
    </Layout>
  );
}
