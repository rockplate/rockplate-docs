import React from 'react';
import { makeStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import BaseTab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';

import { Controlled as CodeMirror } from 'react-codemirror2';
import { Rockplate, Linter, Lint, LinterResult } from 'rockplate';
import { setRockplate } from 'rockplate-codemirror';

import CodeIcon from '@material-ui/icons/Code';
import ResultIcon from '@material-ui/icons/Visibility';
import SchemaIcon from '@material-ui/icons/Assignment';
import ParamsIcon from '@material-ui/icons/Subject';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const cmOptions = {
  theme: 'dracula',
  mode: 'rockplate',
  lineNumbers: true,
  lineWrapping: true,
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
  lint: true,
  viewportMargin: Infinity,
};

const cmJsonOptions = {
  theme: 'dracula',
  mode: { name: 'javascript', json: true },
  lineNumbers: true,
  lineWrapping: true,
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
  lint: true,
  viewportMargin: Infinity,
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const WarningBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#ea971d',
    },
  }),
)(Badge);

const SuccessBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
    },
  }),
)(Badge);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

export interface CodeProps {
  template: string;
  schema: any;
  strict: boolean;
  params: any;
  codeOnly?: boolean;
  onChange?: (change: any) => void;
}

export interface CodeState extends CodeProps {
  tabIndex: number;
  result: string;
  schemaCode: string;
  schemaValid: boolean;
  paramsCode: string;
  paramsValid: boolean;
  lints: Lint[];
}

const Tab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '10px',
    },
    selected: {},
  }),
)((props: { icon: any; label: string }) => <BaseTab {...props} />);

export default class CodeTabs extends React.Component<CodeProps, CodeState> {
  private editor?: CodeMirror.Editor;
  private triggerChange: (change: any) => void;
  constructor(props: CodeProps) {
    super(props);
    this.state = {
      tabIndex: 0,
      template: props.template ? props.template : '',
      schema: props.schema ? props.schema : null,
      strict: props.schema ? props.strict !== false : false,
      params: props.params ? props.params : null,
      schemaCode: props.schema ? JSON.stringify(props.schema, null, 2) : '',
      paramsCode: props.params ? JSON.stringify(props.params, null, 2) : '',
      result: '',
      schemaValid: true,
      paramsValid: true,
      lints: [],
    };
    this.triggerChange = (change) => {
      if (!this.props.onChange) {
        return;
      }
      this.props.onChange(change);
    };
  }
  componentDidMount() {
    this.updated('template');
  }
  updated(what: 'template' | 'params' | 'schema' | 'strict') {
    const strict = this.state.strict === true && this.state.schema;
    if (this.editor) {
      setRockplate(this.editor, this.state.schema, this.state.params, strict);
    }
    const rock = new Rockplate(this.state.template, this.state.schema, strict);
    const result = rock.parse(this.state.params);

    const linter = new Linter(this.state.template, this.state.schema, strict);
    const linterResult = linter.lint(this.state.params);

    this.setState({ result, lints: linterResult.lints }, () => {
      this.triggerChange({
        result: this.state.result,
        lints: this.state.lints,
        template: this.state.template,
        schema: this.state.schema,
        params: this.state.params,
      });
    });
  }
  switchContent(type: string) {
    return undefined;
  }
  render() {
    if (this.props.codeOnly) {
      return (
        <ThemeProvider theme={darkTheme}>
          <div className="code-tabs-wrapper">
            <Card>
              <CardContent>
                <p style={{ marginTop: 0 }}>Live code editor</p>
                {this.getCmPanel()}
                {this.getLints()}
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider theme={darkTheme}>
        <div className="code-tabs-wrapper">
          <AppBar position="static" color="default">
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={this.state.tabIndex}
              onChange={(event, tabIndex) => {
                this.setState({ tabIndex });
              }}
            >
              <Tab
                icon={
                  <Badge badgeContent={this.state.lints.length} color="error">
                    {/* <CodeIcon /> */}
                    [🤘]
                  </Badge>
                }
                label="Code"
              />
              <Tab icon={<ResultIcon />} label="Output" />
              <Tab
                icon={
                  <Badge variant="dot" color="error" invisible={this.state.schemaValid}>
                    <SchemaIcon />
                  </Badge>
                }
                label="Schema"
              />
              <Tab
                icon={
                  <Badge variant="dot" color="error" invisible={this.state.paramsValid}>
                    <ParamsIcon />
                  </Badge>
                }
                label="Params"
              />
            </Tabs>
          </AppBar>
          <Card>
            <CardContent>
              <TabPanel value={this.state.tabIndex} index={0}>
                {this.getCmPanel()}
                {this.getLints()}
              </TabPanel>
              <TabPanel value={this.state.tabIndex} index={1}>
                <pre>{this.state.result}</pre>
              </TabPanel>
              <TabPanel value={this.state.tabIndex} index={2}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.strict}
                        onChange={(event) => {
                          this.setState({ strict: event.target.checked }, () => {
                            this.updated('strict');
                          });
                        }}
                        color="primary"
                      />
                    }
                    label="Enable Schema (STRICT mode)"
                    labelPlacement="end"
                  />
                </FormGroup>
                <pre>{this.getJsonPanel('schema')}</pre>
              </TabPanel>
              <TabPanel value={this.state.tabIndex} index={3}>
                <pre>{this.getJsonPanel('params')}</pre>
              </TabPanel>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
  }
  getLints() {
    return this.state.lints.map((lint, idx) => {
      return (
        <Alert
          style={{
            marginTop: idx === 0 ? '1rem' : '0.5rem',
          }}
          severity={lint.severity}
          key={idx}
        >
          <AlertTitle>{lint.expression}</AlertTitle>
          {lint.message}
          <small>at line {lint.position.begin.line}</small>
        </Alert>
      );
    });
  }
  getCmPanel() {
    return (
      <CodeMirror
        value={this.state.template}
        options={cmOptions}
        onBeforeChange={(editor, change, value) => {
          this.setState({ template: value }, () => {
            this.updated('template');
          });
        }}
        editorDidMount={(editor) => {
          this.editor = editor;
          this.updated('template');
        }}
        className="cm-inline-wrapper"
      />
    );
  }
  getJsonPanel(stateKey: 'params' | 'schema') {
    const keyCode = stateKey + 'Code';
    const code = (this.state as any)[keyCode];
    return (
      <CodeMirror
        value={code}
        options={cmJsonOptions}
        onBeforeChange={(editor, change, value) => {
          let newData;
          try {
            newData = JSON.parse(value);
          } catch (e) {
            //
          }
          this.setState({ [keyCode]: value } as any);
          if (newData) {
            this.setState({ [stateKey]: newData, [stateKey + 'Valid']: true } as any, () => {
              this.updated(stateKey);
            });
          } else {
            this.setState({ [stateKey + 'Valid']: false } as any);
          }
        }}
        editorDidMount={(editor) => {
          this.updated(stateKey);
        }}
        className="cm-inline-wrapper"
      />
    );
  }
}
