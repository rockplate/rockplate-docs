import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import EditPageLink from '../src/EditPageLink';
import SyntaxDocs from '../docs/syntax.mdx';

export default function SyntaxPage() {
  return (
    <Layout>
      <SyntaxDocs />
      <EditPageLink path="docs/syntax.mdx" />
      <FooterLinks
        step={3}
        prev={{ link: '/data-structure', label: 'Data Structure' }}
        next={{ link: '/linter', label: 'Linter' }}
      />
    </Layout>
  );
}
