import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import ToolsDocs from '../docs/tools.mdx';

export default function ToolsPage() {
  return (
    <Layout>
      <ToolsDocs />
      <FooterLinks
        step={5}
        prev={{ link: '/linter', label: 'Linter' }}
        next={{ link: '/advanced-usage', label: 'Advanced Usage' }}
      />
    </Layout>
  );
}
