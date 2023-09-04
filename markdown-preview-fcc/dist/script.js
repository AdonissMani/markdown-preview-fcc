const styles = {
  display: 'flex',
  justifyContent: 'space-evenly',
  paddingTop: 60,
  backgroundColor: '#CCFF99' };


const navStyles = {
  padding: '10px 0 10px 0',
  fontWeight: 'bold',
  color: '#006600',
  textAlign: 'center',
  backgroundColor: '#66CC66' };


const textStyles = {
  padding: 15,
  width: '45%',
  height: window.innerHeight - 150,
  border: '1px solid #CCCCCC',
  backgroundColor: 'white',
  overflow: 'scroll' };


const text =
`# Welcome to my React Markdown Previewer!

## Have fun! (´・ω・｀)
### Feel free to play with markdown! ╰(*°▽°*)╯
  
This is a \`<div></div>\`, a simple code.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine ==  '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [My Personal Page](https://github.com/AdonissMani), and
> Block Quotes!

Column1 | Column2 | Column3
------------ | ------------- | -------------
This is | my | content....
WOW! | YEAH! | WHOAAAAAAAAA!!!

* And last but not least, let's not forget embedded images:

![Doge Meme w/ Text](https://s15.postimg.cc/oxmaj55bv/doge_1_62160_8778_image_13223.gif)
`;


marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  } });

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};
renderer.table = function (header, body) {
  return '<table class="table table-striped">' + header + body + '</table>';
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: text };


    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      content: e.target.value });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("nav", { style: navStyles }, /*#__PURE__*/
      React.createElement("h1", null, "Markdown Viewer")), /*#__PURE__*/

      React.createElement("div", { style: styles }, /*#__PURE__*/
      React.createElement(Editor, {
        onChange: this.handleChange,
        content: this.state.content }), /*#__PURE__*/

      React.createElement(Previewer, {
        content: this.state.content }))));




  }}


class Editor extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("textarea", {
        id: "editor",
        style: textStyles,
        onChange: this.props.onChange,
        defaultValue: this.props.content,
        type: "text" }));



  }}


class Previewer extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: "preview",
        style: textStyles,
        dangerouslySetInnerHTML: { __html: marked(this.props.content, { renderer: renderer }) } }));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.getElementById('root'));