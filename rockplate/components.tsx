import { getComponent, getComponentWrapped } from './rockplate-wrapper';
import { ComponentType } from 'react';
// import { CodeProps } from './CodeTabs';
import { HighlightProps } from './Highlight';

export const LandingDemo = getComponent('LandingDemo');
export const RockPlateIntro = getComponent('rockplate-intro-block');
interface CodeTabsProps {
  template?: string;
  schema?: any;
  params?: any;
  strict?: boolean;
  codeOnly?: boolean;
  onChange?: (change: any) => void;
}
export const CodeTabs: ComponentType<CodeTabsProps> = getComponent('CodeTabs');
export const HighlightDynamic = getComponent('Highlight');
export const Highlight = (props: HighlightProps) => {
  return (
    <div>
      <div
        className={'highlight-component-server ' + props.className + ' language-' + props.language}
        style={{ display: 'none' }}
      >
        {props.children}
      </div>
      <div className={'highlight-component-browser'}>
        <HighlightDynamic {...props} />
      </div>
    </div>
  );
};
