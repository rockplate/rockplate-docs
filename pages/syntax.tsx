import Layout from '../src/Layout';
import FooterLinks from '../src/FooterLinks';
import SyntaxDocs from '../docs/syntax.mdx';

export default function SyntaxPage() {
  return (
    <Layout>
      <SyntaxDocs />
      <FooterLinks
        step={3}
        prev={{ link: '/data-structure', label: 'Data Structure' }}
        next={{ link: '/linter', label: 'Linter' }}
      />
    </Layout>
  );
}
