import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import EditPageLink from '../src/EditPageLink';
import ToolsDocs from '../docs/tools.mdx';

export default function ToolsPage() {
  return (
    <Layout>
      <ToolsDocs />
      <EditPageLink path="docs/tools.mdx" />
      <FooterLinks
        step={5}
        prev={{ link: '/linter', label: 'Linter' }}
        next={{ link: '/advanced-usage', label: 'Advanced Usage' }}
      />
    </Layout>
  );
}
