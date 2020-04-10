import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import CodeTabs from './CodeTabs';
import { Rockplate, Builder } from 'rockplate';

type Mode = 'javascript' | 'rockplate' | 'json' | 'html';

const options = {
  theme: 'dracula',
  mode: 'rockplate' as any,
  lineNumbers: true,
  lineWrapping: true,
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
  lint: true,
  viewportMargin: Infinity,
};

type Language = Mode | 'rockplate:tabs';

export interface HighlightProps {
  language?: Language;
  className?: string;
  children: string;
}

export default class Highlight extends React.Component<
  HighlightProps,
  {
    code: string;
  }
> {
  private language: Language;
  constructor(props: HighlightProps) {
    super(props);
    this.language = props.language || ((props.className || 'unknown').replace('language-', '') as Language);
    const code = props.children;
    this.state = {
      code,
    };
  }
  componentDidUpdate(prevProps: HighlightProps) {
    if (prevProps.children !== this.props.children) {
      this.setState({
        code: this.props.children,
      });
    }
  }
  render() {
    if (this.language === 'rockplate:tabs') {
      const builder = new Builder(this.state.code);
      builder.build();
      if (builder.schema) {
        return (
          <CodeTabs template={builder.template.trim()} schema={builder.schema} params={builder.schema} strict={true} />
        );
      }
      this.language = 'rockplate';
    }
    options.lint = this.language !== 'rockplate';
    options.theme = this.language === 'rockplate' || this.language === 'json' ? 'dracula' : 'monokai';
    options.mode = this.language === 'json' ? { name: 'javascript', json: this.language === 'json' } : this.language;
    return (
      <div className={'highlight-container'}>
        <CodeMirror
          value={this.state.code.trim()}
          onBeforeChange={(editor, change, value) => {
            // no op: readonly
          }}
          options={options}
          className={'cm-inline-wrapper'}
        />
      </div>
    );
  }
}
