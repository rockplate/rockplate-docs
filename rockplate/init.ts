export default () => {
  const CodeMirror = require('codemirror');

  require('react-codemirror2');

  require('codemirror/addon/fold/foldcode');
  require('codemirror/addon/fold/foldgutter');
  require('codemirror/addon/fold/brace-fold');

  require('codemirror/addon/lint/lint');
  require('codemirror/addon/lint/json-lint');

  require('codemirror/addon/fold/indent-fold');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/addon/mode/overlay');

  const rockplateCodemirror = require('rockplate-codemirror');
  rockplateCodemirror.register(CodeMirror);
};
