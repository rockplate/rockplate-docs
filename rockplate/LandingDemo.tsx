import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Rockplate } from 'rockplate';
import { setRockplate } from 'rockplate-codemirror';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import BuildLinks from './links.mdx';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Highlight from './Highlight';
import { CodeTabs } from './components';

import Link from '@material-ui/core/Link';

import NextLink from 'next/link';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const options = {
  theme: 'dracula',
  mode: 'rockplate',
  lineNumbers: true,
  lineWrapping: true,
  foldGutter: true,
  gutters: [/**/ 'CodeMirror-linenumbers', 'CodeMirror-foldgutter', /**/ 'CodeMirror-lint-markers'],
  lint: true,
  viewportMargin: Infinity,
};

const schema = {
  you: {
    'a developer': false,
    'genius': '',
  },
};

export default class RockPlateIntroBlock extends React.Component<
  {},
  {
    template: string;
    message: string;
    params: typeof schema;
  }
> {
  private rock?: Rockplate;
  constructor(props: any) {
    super(props);
    const template = `[if you are a developer]
  You code, you rock
  [you genius] 🤘
[else]
  Stay home 😊 [-- Crisis --]
[end if]`;
    this.state = {
      template,
      message: '',
      params: schema,
    };
  }
  componentDidMount() {
    this.getMessage(true);
  }
  getMessage(setState = false, updateTemplate = false) {
    if (!this.rock || updateTemplate) {
      this.rock = new Rockplate(this.state.template, schema);
    }
    const message = this.rock.parse(this.state.params);
    if (setState) {
      this.setState({ message });
    }
    return message;
  }
  getParamsCode() {
    return JSON.stringify(this.state.params, null, 2);
  }
  paramsChanged(checked?: boolean, value?: string) {
    const isDeveloper = checked !== undefined ? checked : this.state.params.you['a developer'];
    const newMessage = value !== undefined ? value : this.state.params.you.genius;
    this.setState(
      {
        params: {
          you: {
            'a developer': isDeveloper,
            'genius': newMessage,
          },
        },
      },
      () => {
        this.getMessage(true);
      },
    );
  }
  inputChanged(value: string) {
    this.paramsChanged(undefined, value);
  }
  toggleChanged(checked: boolean) {
    this.paramsChanged(checked, undefined);
  }
  getCodeSection() {
    return (
      <div>
        <div>Hello there</div>
      </div>
    );
  }
  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6}>
          <CodeTabs
            template={this.state.template}
            schema={schema}
            params={this.state.params}
            codeOnly={true}
            onChange={(change) => {
              this.setState(
                {
                  template: change.template,
                },
                () => {
                  this.getMessage(true, true);
                },
              );
            }}
          />
          <div className="">
            <h2>{this.state.message}</h2>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="params-wrapper">
          <div>
            <ThemeProvider theme={darkTheme}>
              <div className="code-tabs-wrapper">
                <Card>
                  <CardContent>
                    <p style={{ marginTop: 0 }}>(readonly) Params</p>
                    <Highlight language="json">{this.getParamsCode()}</Highlight>
                  </CardContent>
                </Card>
              </div>
            </ThemeProvider>
          </div>
          <div style={{ margin: '0.83em 0' }}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.params.you['a developer']}
                    onChange={(event) => {
                      this.toggleChanged(event.target.checked);
                    }}
                    color="primary"
                  />
                }
                label={this.state.params.you['a developer'] ? '' : 'you are a developer'}
              />
              {this.state.params.you['a developer'] ? (
                <Input
                  placeholder="Enter your name, genius"
                  value={this.state.params.you.genius}
                  onChange={(event) => {
                    this.inputChanged(event.target.value);
                  }}
                  inputProps={{ 'aria-label': 'Enter your name, genius' }}
                />
              ) : (
                ''
              )}
            </FormGroup>
          </div>
        </Grid>
      </Grid>
    );
  }
}
